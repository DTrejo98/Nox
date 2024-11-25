import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './client'; // Import the initialized auth service

const signIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // Handle successful login
      const { user } = result;
      console.log(user);
    })
    .catch((error) => {
      // Handle errors
      console.error(error);
    });
};

const signOut = () => {
  firebaseSignOut(auth)
    .then(() => {
      console.log('User signed out');
    })
    .catch((error) => {
      console.error('Error signing out: ', error);
    });
};

export { signIn, signOut };
