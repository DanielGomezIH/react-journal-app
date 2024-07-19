import { Link as RouterLink } from "react-router-dom";
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch } from 'react-redux';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const defaultFormValues = {
  email: '',
  password: ''
};

export const LoginPage = () => {

  const { formState, email, password, onInputChange } = useForm( defaultFormValues );

  const { status, errorMessage } = useSelector( ( state ) => state.auth );

  const isAuthenticating = useMemo( () => status === 'checking', [ status ] );

  const dispatch = useDispatch();

  const onSubmit = ( event ) => {
    event.preventDefault();

    dispatch( startLoginWithEmailPassword( formState ) );
  };

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  };

  return (
    <AuthLayout title='Login'>

      <form
        onSubmit={ onSubmit }
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container>

          <Grid item xs={ 12 } sx={ { mt: 2 } }>
            <TextField
              fullWidth
              label='Email'
              name='email'
              onChange={ onInputChange }
              placeholder='email@google.com'
              type='email'
              value={ email }
            />
          </Grid>

          <Grid item xs={ 12 } sx={ { mt: 2 } }>
            <TextField
              fullWidth
              label='Password'
              name='password'
              onChange={ onInputChange }
              placeholder='Password'
              type='password'
              value={ password }
            />
          </Grid>

          <Grid
            container
            spacing={ 2 }
            sx={ { mb: 2, mt: 0 } }
          >
            <Grid
              item xs={ 12 }
              sm={ 6 }
              display={ errorMessage ? '' : 'none' }
            >
              <Alert severity='error'>
                { errorMessage }
              </Alert>
            </Grid>

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
                fullWidth
                onClick={ onGoogleSignIn }
                variant='outlined'
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