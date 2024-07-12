import { TurnedInNot } from '@mui/icons-material';
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export const SideBar = ( { drawerWidth = 240 } ) => {

  const { displayName } = useSelector( state => state.auth );

  return (
    <Box
      component='nav'
      sx={ {
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }
      }
    >
      <Drawer
        variant='permanent'
        open
        sx={ {
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        } }
      >

        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
          >
            { displayName }
          </Typography>
        </Toolbar>

        <Divider />

        <List>
          {
            [ 'January', 'February', 'March', 'April' ].map( ( text ) => (
              <ListItem key={ text } disablePadding>
                <ListItemButton sx={ { display: 'flex' } }>

                  <ListItemIcon sx={ { alignSelf: 'start', mt: '6px' } }>
                    <TurnedInNot />
                  </ListItemIcon>

                  <Grid
                    container
                  >
                    <ListItemText primary={ text } />
                    <ListItemText secondary={ 'Fugiat esse et amet officia deserunt nostrud magna minim.' } />
                  </Grid>
                </ListItemButton>
              </ListItem>
            ) )
          }
        </List>

      </Drawer>
    </Box>
  );
};

SideBar.propTypes = {
  drawerWidth: PropTypes.number.isRequired
};