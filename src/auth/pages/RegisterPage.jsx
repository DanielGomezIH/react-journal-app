import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useState } from 'react';

const defaultFormValues = {
  fullName: '',
  email: '',
  password: ''
};

const formValidations = {
  fullName: [ ( value ) => value.length >= 1, 'Full name is required.' ],
  email: [ ( value ) => value.includes( '@' ), 'Email must have @.' ],
  password: [ ( value ) => value.length >= 6, 'Password must be more than 6 characters.' ]
};

export const RegisterPage = () => {

  const [ formSubmitted, setFormSubmitted ] = useState( false );

  const {
    isFormValid,
    fullNameValid,
    emailValid,
    passwordValid,
    fullName,
    email,
    password,
    onInputChange
  } = useForm( defaultFormValues, formValidations );


  const onSubmit = ( event ) => {
    event.preventDefault();

    setFormSubmitted( true );

    console.log( { fullName, email, password } );
  };

  return (
    <AuthLayout title='Create Account'>

      <form onSubmit={ onSubmit }>
        <Grid container>

          <Grid item xs={ 12 } sx={ { mt: 2 } }>
            <TextField
              fullWidth
              label='Full name'
              name='fullName'
              onChange={ onInputChange }
              placeholder='Joe Smith'
              type='text'
              value={ fullName }
              error={ !!fullNameValid && formSubmitted }
              helperText={ fullNameValid }
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
            <Grid item xs={ 12 }>
              <Button
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