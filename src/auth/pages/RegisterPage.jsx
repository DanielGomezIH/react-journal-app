import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useState } from 'react';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

const defaultFormValues = {
  displayName: '',
  email: '',
  password: ''
};

const formValidations = {
  displayName: [ ( value ) => value.length >= 1, 'Full name is required.' ],
  email: [ ( value ) => value.includes( '@' ), 'Email must have @.' ],
  password: [ ( value ) => value.length >= 6, 'Password must be more than 6 characters.' ]
};

export const RegisterPage = () => {

  const [ formSubmitted, setFormSubmitted ] = useState( false );
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector( ( state ) => state.auth );

  const isCheckingAuthentication = useMemo( () => status === 'checking', [ status ] );

  const {
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
    formState,
    displayName,
    email,
    password,
    onInputChange
  } = useForm( defaultFormValues, formValidations );


  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted( true );

    if ( !isFormValid || isCheckingAuthentication ) return;

    dispatch( startCreatingUserWithEmailPassword( formState ) );
  };

  return (
    <AuthLayout title='Create Account'>

      <form
        onSubmit={ onSubmit }
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container>

          <Grid item xs={ 12 } sx={ { mt: 2 } }>
            <TextField
              fullWidth
              label='Full name'
              name='displayName'
              onChange={ onInputChange }
              placeholder='Joe Smith'
              type='text'
              value={ displayName }
              error={ !!displayNameValid && formSubmitted }
              helperText={ displayNameValid }
            />
          </Grid>

          <Grid item xs={ 12 } sx={ { mt: 2 } }>
            <TextField
              fullWidth
              label='Email'
              name='email'
              onChange={ onInputChange }
              placeholder='email@google.com'
              type='email'
              value={ email }
              error={ !!emailValid && formSubmitted }
              helperText={ emailValid }
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
              error={ !!passwordValid && formSubmitted }
              helperText={ passwordValid }
            />
          </Grid>

          <Grid
            container
            spacing={ 2 }
            sx={ { mb: 2, mt: 1 } }
          >
            <Grid
              item
              xs={ 12 }
              display={ errorMessage ? '' : 'none' }
            >
              <Alert severity='error'>
                { errorMessage }
              </Alert>
            </Grid>

            <Grid item xs={ 12 }>
              <Button
                disabled={ isCheckingAuthentication }
                fullWidth
                type='submit'
                variant='contained'
              >
                Register
              </Button>
            </Grid>

          </Grid>

          <Grid
            container
            direction='row'
            justifyContent='end'
            alignItems='center'
          >
            <Typography sx={ { mr: 2 } }>
              Already have an account?
            </Typography>

            <Link component={ RouterLink } to='/auth/login' color='inherit'>
              Login
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  );
};