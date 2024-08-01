import {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  journalSlice,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote
} from '../../../src/store/journal/journalSlice';

import {
  initialJournalState,
  messageAfterDelete,
  messageAfterUpdate,
  multipleNotes,
  newEmptyNote,
  newPhotos,
  singleNote,
  stateWithActiveNote,
  stateWithNotes,
  updatedMockNote,
} from '../../fixtures/journalFixtures.js';


describe( 'Pruebas en journalSlice', () => {

  test( 'Debe retornar el estado inicial y llamarse journal', () => {

    const state = journalSlice.reducer( initialJournalState, {} );

    expect( state ).toEqual( initialJournalState );
  } );

  expect( journalSlice.name ).toBe( 'journal' );



  test( 'Debe cambiar isSaving a true con savingNewNote', () => {

    const state = journalSlice.reducer( initialJournalState, savingNewNote() );

    expect( state ).toEqual(
      {
        ...initialJournalState,
        isSaving: true,
      }
    );

  } );

  test( 'Debe agregar una nueva nota vacía y cambiar isSaving a false con addNewEmptyNote', () => {

    const state = journalSlice.reducer( { ...initialJournalState, isSaving: true }, addNewEmptyNote( newEmptyNote ) );

    expect( state ).toEqual(
      {
        ...initialJournalState,
        isSaving: false,
        notes: [ newEmptyNote ],
      }
    );
  } );

  test( 'Debe establecer una nota activa y limpiar messageSaved con setActiveNote', () => {

    const state = journalSlice.reducer( initialJournalState, setActiveNote( singleNote ) );

    expect( state ).toEqual(
      {
        ...initialJournalState,
        messageSaved: '',
        active: singleNote
      }
    );
  } );

  test( 'Debe añadir fotos a la nota activa y cambiar isSaving a false con setPhotosToActiveNote', () => {

    const activeNote = stateWithActiveNote.active;

    const state = journalSlice.reducer( { ...stateWithActiveNote, isSaving: true }, setPhotosToActiveNote( newPhotos ) );

    expect( state ).toEqual( {
      ...stateWithActiveNote,
      isSaving: false,
      active: {
        id: activeNote.id,
        title: activeNote.title,
        body: activeNote.body,
        date: activeNote.date,
        imageUrls: [
          ...activeNote.imageUrls,
          ...newPhotos
        ]
      }
    } );
  } );

  test( 'Debe establecer las notas con setNotes', () => {

    const state = journalSlice.reducer( initialJournalState, setNotes( multipleNotes ) );

    expect( state ).toEqual(
      {
        ...initialJournalState,
        notes: [ ...multipleNotes ]
      }
    );
  } );

  test( 'Debe cambiar isSaving a true y limpiar messageSaved con setSaving', () => {

    const state = journalSlice.reducer( initialJournalState, setSaving() );

    expect( state ).toEqual(
      {
        ...initialJournalState,
        isSaving: true,
        messageSaved: ''
      }
    );
  } );

  test( 'Debe actualizar una nota, cambiar isSaving a false y establecer messageSaved con updateNote', () => {

    const state = journalSlice.reducer( { ...stateWithNotes, isSaving: true }, updateNote( updatedMockNote ) );

    expect( state ).toEqual(
      {
        ...stateWithNotes,
        isSaving: false,
        messageSaved: messageAfterUpdate,
        notes: [
          updatedMockNote,
          stateWithNotes.notes[ 1 ]
        ]
      }
    );
  } );

  test( 'Debe eliminar una nota por id, establecer messageSaved y cambiar active a null con deleteNoteById', () => {

    const state = journalSlice.reducer( stateWithActiveNote, deleteNoteById( singleNote.id ) );

    expect( state ).toEqual(
      {
        ...stateWithActiveNote,
        messageSaved: messageAfterDelete,
        notes: [ stateWithNotes.notes[ 1 ] ],
        active: null
      }
    );
  } );

  test( 'Debe limpiar todas las notas y resetear el estado con clearNotesLogout', () => {

    const state = journalSlice.reducer( stateWithActiveNote, clearNotesLogout() );

    expect( state ).toEqual( initialJournalState );
  } );

} );
