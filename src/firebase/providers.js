import { FirebaseAuth } from './config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup( FirebaseAuth, googleProvider );

    const user = result.user;

    const { displayName, email, photoURL, uid } = user;

    return {
      ok: true,
      uid,
      email,
      displayName,
      photoURL,
    };
  } catch ( error ) {

    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage
    };
  }
};

export const loginWithEmailPassword = async ( { email, password } ) => {
  try {
    const result = await signInWithEmailAndPassword( FirebaseAuth, email, password );

    const { uid, displayName, photoURL } = result.user;

    return {
      ok: true,
      uid,
      email,
      displayName,
      photoURL,
    };
  } catch ( error ) {

    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage
    };
  }
};

export const registerUserWithPassword = async ( { displayName, email, password } ) => {
  try {
    const result = await createUserWithEmailAndPassword( FirebaseAuth, email, password );

    const { uid, photoURL } = result.user;

    await updateProfile( FirebaseAuth.currentUser, { displayName } );

    return {
      ok: true,
      uid,
      email,
      displayName,
      photoURL,
    };

  } catch ( error ) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage
    };
  }
};