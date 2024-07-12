import { signInWithGoogle, registerUserWithPassword, loginWithEmailPassword, logoutFirebase } from '../../firebase';
import { checkingCredentials, login, logout } from './';

export const checkingAuthentication = () => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() );
  };
};

export const startGoogleSignIn = () => {
  return async ( dispatch ) => {

    dispatch( checkingCredentials() );

    const { ok, uid, email, displayName, photoURL, errorMessage } = await signInWithGoogle();

    if ( !ok ) return dispatch( logout( { errorMessage } ) );

    dispatch( login( { uid, email, displayName, photoURL } ) );
  };
};

export const startCreatingUserWithEmailPassword = ( { displayName, email, password } ) => {
  return async ( dispatch ) => {

    dispatch( checkingCredentials() );

    const { ok, uid, photoURL, errorMessage } = await registerUserWithPassword( { displayName, email, password } );

    if ( !ok ) return dispatch( logout( { errorMessage } ) );

    dispatch( login( { uid, email, displayName, photoURL } ) );
  };
};

export const startLoginWithEmailPassword = ( { email, password } ) => {
  return async ( dispatch ) => {

    dispatch( checkingCredentials() );

    const { ok, uid, displayName, photoURL, errorMessage } = await loginWithEmailPassword( { email, password } );

    if ( !ok ) return dispatch( logout( { errorMessage } ) );

    dispatch( login( {
      uid,
      email,
      displayName,
      photoURL,
    } ) );
  };
};

export const startLogout = () => {
  return async ( dispatch ) => {
    await logoutFirebase();
    dispatch( logout() );
  };
};