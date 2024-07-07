import { Link as RouterLink } from "react-router-dom";
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout title='Create Account'>

      <form>
        <Grid container>

          <Grid item xs={ 12 } sx={ { mt: 2 } }>
            <TextField
              label='Full name'
              type='text'
              placeholder='Joe Smith'
              fullWidth
            />
          </Grid>

          <Grid item xs={ 12 } sx={ { mt: 2 } }>
            <TextField
              label='Email'
              placeholder='email@google.com'
              type='email'
              fullWidth
            />
          </Grid>

          <Grid item xs={ 12 } sx={ { mt: 2 } }>
            <TextField
              label='Password'
              type='password'
              placeholder='Password'
              fullWidth
            />
          </Grid>

          <Grid
            container
            spacing={ 2 }
            sx={ { mb: 2, mt: 1 } }
          >
            <Grid item xs={ 12 }>
              <Button
                variant='contained'
                fullWidth
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