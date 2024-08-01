import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore/lite';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from '../../../src/store/journal/journalSlice';
import { startDeletingNote, startLoadingNotes, startNewNote, startSavingNote, startUploadingFiles } from '../../../src/store/journal/thunks';
import { FirebaseDB } from '../../../src/firebase';
import { multipleNotes, singleNote } from '../../fixtures/journalFixtures';
import { loadNotes, fileUpload } from '../../../src/helpers';

jest.mock( '../../../src/helpers/loadNotes' );
jest.mock( '../../../src/helpers/fileUpload' );

describe( 'Pruebas en Journal Thunks', () => {

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach( () => jest.clearAllMocks() );

  test( 'Debe de establecer el modo de carga, crear una nueva nota en blanco y activarla.', async () => {

    const uid = 'TEST-UID';
    getState.mockReturnValue( { auth: { uid } } );

    await startNewNote()( dispatch, getState );

    expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );

    expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote( {
      body: '',
      title: '',
      id: expect.any( String ),
      date: expect.any( Number ),
      imageUrls: expect.any( Array ),
    } ) );

    expect( dispatch ).toHaveBeenCalledWith( setActiveNote( {
      body: '',
      title: '',
      id: expect.any( String ),
      date: expect.any( Number ),
      imageUrls: expect.any( Array ),
    } ) );

    // Borrar inserciones de firebase

    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );

    const docs = await getDocs( collectionRef );

    const deletePromise = [];

    docs.forEach( ( doc ) => deletePromise.push( deleteDoc( doc.ref ) ) );

    await Promise.all( deletePromise );
  } );

  test( 'Debe de establecer el modo carga, guardar la nota en firestore y actualizarla en el store.', async () => {

    const uid = 'TEST-UID';
    const note = singleNote;

    getState.mockReturnValue( {
      auth: { uid },
      journal: { active: note }
    } );

    await startSavingNote()( dispatch, getState );

    expect( dispatch ).toHaveBeenCalledWith( setSaving() );

    expect( dispatch ).toHaveBeenCalledWith( updateNote( note ) );

    const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );

    await deleteDoc( docRef );
  } );

  test( 'Debe de cargar las notas y establecerlas en el store.', async () => {

    loadNotes.mockResolvedValue( multipleNotes );

    const uid = 'TEST-UID';
    getState.mockReturnValue( { auth: { uid } } );

    await startLoadingNotes()( dispatch, getState );

    expect( loadNotes ).toHaveBeenCalledWith( uid );

    expect( dispatch ).toHaveBeenCalledWith( setNotes( multipleNotes ) );
  } );

  test( 'Debe de establecer el modo de carga, subir las imagenes a cloudinary y establecerlas en la nota activa.', async () => {

    fileUpload.mockImplementation( file => Promise.resolve( `https://example.com/${ file.name }` ) );

    const files = [
      new File( [ '' ], 'photo1.jpg' ),
      new File( [ '' ], 'photo2.jpg' )
    ];

    const fileUploadPromises = [];

    for ( const file of files ) {
      fileUploadPromises.push( fileUpload( file ) );
    }

    const photosUrls = await Promise.all( fileUploadPromises );

    await startUploadingFiles( files )( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( setSaving() );

    expect( fileUpload ).toHaveBeenCalledWith( files[ 0 ] );

    expect( fileUpload ).toHaveBeenCalledWith( files[ 1 ] );

    expect( dispatch ).toHaveBeenCalledWith( setPhotosToActiveNote( photosUrls ) );
  } );

  test( 'Debe de eliminar la nota de firebase y del store.', async () => {

    const uid = 'TEST-UID';
    const note = singleNote;

    getState.mockReturnValue( {
      auth: { uid },
      journal: {
        active: note
      }
    } );

    await startDeletingNote()( dispatch, getState );

    expect( dispatch ).toHaveBeenCalledWith( deleteNoteById( note.id ) );
  } );

} );