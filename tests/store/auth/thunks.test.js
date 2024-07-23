import {
  checkingAuthentication,
  checkingCredentials,
  login,
  logout,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout
} from '../../../src/store/auth';

import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithPassword,
  signInWithGoogle
} from '../../../src/firebase/providers.js';

import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock( '../../../src/firebase/providers.js' );

describe( 'Pruebas en authThunks', () => {

  const dispatch = jest.fn();

  beforeEach( () => jest.clearAllMocks() );

  test( 'Debe de invocar el checkingCredentials', async () => {

    await checkingAuthentication()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
  } );

  test( 'startGoogleSignIn debe de llamar checkingCredentials y login', async () => {

    await signInWithGoogle.mockResolvedValue( { ok: true, ...demoUser } );

    await startGoogleSignIn()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    expect( dispatch ).toHaveBeenCalledWith( login( demoUser ) );

  } );

  test( 'starGoogleSignIn debe de llamar checkingCredentials y el logout con mensaje de error', async () => {

    const errorMessage = 'Error en google.';

    await signInWithGoogle.mockResolvedValue( { ok: false, errorMessage } );

    await startGoogleSignIn()( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage } ) );

  } );

  test( 'startCreatingUserWithEmailPassword debe de llamar checkingCredentials y login', async () => {

    await registerUserWithPassword.mockResolvedValue( { ok: true, ...demoUser } );

    await startCreatingUserWithEmailPassword( { password: '12345', ...demoUser } )( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    expect( dispatch ).toHaveBeenCalledWith( login( { ...demoUser } ) );

  } );

  test( 'startCreatingUserWithEmailPassword debe de llamar checkingCredentials y logout', async () => {

    const errorMessage = 'Error en firebase.';

    await registerUserWithPassword.mockResolvedValue( { ok: false, errorMessage } );

    await startCreatingUserWithEmailPassword( { password: '12345', ...demoUser } )( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage } ) );

  } );

  test( 'startLoginWithEmailPassword debe de llamar checkingCredentials y login', async () => {

    await loginWithEmailPassword.mockResolvedValue( { ok: true, ...demoUser } );

    await startLoginWithEmailPassword( { password: '12345', ...demoUser } )( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    expect( dispatch ).toHaveBeenCalledWith( login( { ...demoUser } ) );

  } );

  test( 'startLoginWithEmailPassword debe de llamar checkingCredentials y logout', async () => {

    const errorMessage = 'Error en firebase.';

    await loginWithEmailPassword.mockResolvedValue( { ok: false, errorMessage } );

    await startLoginWithEmailPassword( { password: '12345', ...demoUser } )( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

    expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage } ) );

  } );

  test( 'startLogout debe de llamar el logout y limpiar las notas', async () => {

    await startLogout()( dispatch );

    expect( logoutFirebase ).toHaveBeenCalled();

    expect( dispatch ).toHaveBeenCalledWith( logout() );

    expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );

  } );
} );