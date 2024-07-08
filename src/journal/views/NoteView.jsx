import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components/ImageGallery';

export const NoteView = () => {
  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={ { mb: 1 } }
    >

      <Grid item>
        <Typography fontSize={ 35 } fontWeight='light' >
          July 5, 2024
        </Typography>
      </Grid>

      <Grid item>
        <Button color='primary' sz={ { p: 2 } }>
          <SaveOutlined sx={ { fontSize: 30 } } />
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
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='What did you do today?'
          minRows={ 5 }
        />
      </Grid>

      <ImageGallery />
    </Grid>
  );
};