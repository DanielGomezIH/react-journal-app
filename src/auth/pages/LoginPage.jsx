import { Link as RouterLink } from "react-router-dom";
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch } from 'react-redux';
import { checkingAuthentication, startGoogleSignIn } from '../../store';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export const LoginPage = () => {

  const { email, password, onInputChange } = useForm( {
    email: 'danielivgho5@gmail.com',
    password: '12345'
  } );

  const { status } = useSelector( ( state ) => state.auth );

  const isAuthenticating = useMemo( () => status === 'checking', [ status ] );

  const dispatch = useDispatch();

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch( checkingAuthentication() );
  };

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  };

  return (
    <AuthLayout title='Login'>

      <form onSubmit={ onSubmit }>
        <Grid container>

          <Grid item xs={ 12 } sx={ { mt: 2 } }>
            <TextField
              name='email'
              label='Email'
              placeholder='email@google.com'
              type='email'
              fullWidth
              value={ email }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid item xs={ 12 } sx={ { mt: 2 } }>
            <TextField
              name='password'
              label='Password'
              type='password'
              placeholder='Password'
              fullWidth
              value={ password }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid
            container
            spacing={ 2 }
            sx={ { mb: 2, mt: 1 } }
          >
            <Grid item xs={ 12 } sm={ 6 }>
              <Button
                disabled={ isAuthenticating }
                variant='contained'
                fullWidth
                type='submit'
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={ 12 } sm={ 6 }>
              <Button
                disabled={ isAuthenticating }
                variant='outlined'
                fullWidth
                onClick={ onGoogleSignIn }
              >
                <Google fontSize='small' />

                <Typography variant='button' sx={ { ml: 1 } }>
                  Google
                </Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid
            container
            direction='row'
            justifyContent='end'
          >
            <Link component={ RouterLink } to='/auth/register' color='inherit'>
              Create account
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  );
};