import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { LoginPage } from '../../../src/auth/pages';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../../../src/store';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock( '../../../src/store/auth/thunks.js', () => ( {
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ( { email, password } ) => {
    return () => mockStartLoginWithEmailPassword( { email, password } );
  },
} ) );

jest.mock( 'react-redux', () => ( {
  ...jest.requireActual( 'react-redux' ),
  useDispatch: () => ( fn ) => fn()
} ) );


export const store = configureStore( {
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
} );

describe( 'Pruebas en <LoginPage/>', () => {

  beforeEach( () => jest.clearAllMocks() );

  test( 'Debe de mostrar el componente correctamente', () => {

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect( screen.getAllByText( 'Login' ).length ).toBeGreaterThanOrEqual( 1 );
  } );

  test( 'Debe de llamar startGoogleSignIn', () => {

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText( 'google-btn' );

    fireEvent.click( googleBtn );

    expect( mockStartGoogleSignIn ).toHaveBeenCalled();
  } );

  test( 'Submit debe de llamar startLoginWithEmalPassword', () => {

    const email = 'daniel@google.com';
    const password = '12345';

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole( 'textbox', { name: 'Email' } );
    fireEvent.change( emailField, { target: { name: 'email', value: email } } );

    const passwordField = screen.getByTestId( 'password' );
    fireEvent.change( passwordField, { target: { name: 'password', value: password } } );

    const form = screen.getByLabelText( 'submit-form' );
    fireEvent.submit( form );

    expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith( {
      email,
      password
    } );
  } );
} );