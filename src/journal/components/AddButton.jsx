import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const AddButton = () => {
  return (
    <IconButton
      size='small'
      sx={ {
        color: 'white',
        backgroundColor: 'error.main',
        ':hover': { backgroundColor: 'error.main', opacity: 0.8 },
        position: 'fixed',
        right: 50,
        bottom: 50
      } }
    >
      <AddOutlined sx={ { fontSize: 30 } } />
    </IconButton>
  );
};