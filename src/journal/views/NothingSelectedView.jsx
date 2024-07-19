import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NothingSelectedView = () => {

  const { messageSaved, } = useSelector( state => state.journal );

  useEffect( () => {
    if ( messageSaved.length > 0 ) {
      Swal.fire( 'Note deleted', messageSaved, 'success' );
    }
  }, [ messageSaved ] );

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={ 0 }
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={ { minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3 } }
    >
      <Grid
        item
        xs={ 12 }
      >
        <StarOutlined sx={ { fontSize: 80, color: 'white' } } />
      </Grid>

      <Grid
        item
        xs={ 12 }
      >
        <Typography variant='h5' color='white'>Select or create a new note</Typography>
      </Grid>
    </Grid>
  );
};