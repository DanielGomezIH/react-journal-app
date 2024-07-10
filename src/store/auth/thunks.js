import { signInWithGoogle } from '../../firebase';
import { checkingCredentials, login, logout } from './';

export const checkingAuthentication = ( email, password ) => {
  return async ( dispatch ) => {

    dispatch( checkingCredentials() );

  };
};

export const startGoogleSignIn = () => {
  return async ( dispatch ) => {

    dispatch( checkingCredentials() );

    const result = await signInWithGoogle();

    if ( !result.ok ) return dispatch( logout( result ) );

    dispatch( login( result ) );
  };
};