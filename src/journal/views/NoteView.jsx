import { useMemo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined, UploadOutlined, DeleteOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal';
import { ImageGallery } from '../components/ImageGallery';
import { useForm } from '../../hooks/useForm';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

  const dispatch = useDispatch();

  const { active: activeNote, messageSaved, isSaving, } = useSelector( state => state.journal );

  const { formState, title, body, date, onInputChange } = useForm( activeNote );

  const fileInputRef = useRef();

  const dateString = useMemo( () => {
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [ date ] );

  const onSaveNote = () => {
    dispatch( startSavingNote() );
  };

  const onFileInputChange = ( { target } ) => {
    if ( target.files === 0 ) return;

    dispatch( startUploadingFiles( target.files ) );
  };

  const onDelete = () => {

    dispatch( startDeletingNote() );

  };

  useEffect( () => {
    if ( messageSaved.length > 0 ) {
      Swal.fire( 'Note updated', messageSaved, 'success' );
    }
  }, [ messageSaved ] );

  useEffect( () => {
    dispatch( setActiveNote( formState ) );
  }, [ formState ] );

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={ { mb: 1 } }
    >

      <Grid item>
        <Typography fontSize={ 35 } fontWeight='light' >
          { dateString }
        </Typography>
      </Grid>

      <input
        ref={ fileInputRef }
        type='file'
        multiple
        onChange={ onFileInputChange }
        style={ { display: 'none' } }
      />

      <IconButton
        color='primary'
        disabled={ isSaving }
        onClick={ () => fileInputRef.current.click() }
      >
        <UploadOutlined />
      </IconButton>

      <Grid item>
        <Button
          disabled={ isSaving }
          onClick={ onSaveNote }
          color='primary'
          sx={ { padding: 2 } }
        >
          <SaveOutlined sx={ { fontSize: 30, mr: 1 } } />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Type a title'
          label="Title"
          sx={ { border: 'none', mb: 1 } }
          value={ title }
          onChange={ onInputChange }
          name='title'
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='What did you do today?'
          minRows={ 5 }
          value={ body }
          onChange={ onInputChange }
          name='body'
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button
          onClick={ onDelete }
          sx={ { mt: 2 } }
          color='error'
        >
          <DeleteOutlined />
          Borrar
        </Button>
      </Grid>

      <ImageGallery images={ activeNote.imageUrls } />
    </Grid>
  );
};