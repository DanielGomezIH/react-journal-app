import { StarOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

export const NothingSelectedView = () => {
  return (
    <Grid
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
        sx={ { fonmtSize: 100, color: 'white' } }
      >
        <StarOutlined />
      </Grid>

      <Grid
        item
        xs={ 12 }
        sx={ { fonmtSize: 100, color: 'white' } }
      >
        <Typography variant='h5' xcolor='white'>Select or create a new note</Typography>
      </Grid>
    </Grid>
  );
};