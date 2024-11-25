// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; // Import modular functions

import { auth } from '@/utils/client'; // Import auth from client.js

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

function AuthProvider(props) {
  const [user, setUser] = useState(null);

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  useEffect(() => {
    // Replace firebase.auth() with getAuth() for Firebase v9+
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      // Use onAuthStateChanged from the modular SDK
      if (fbUser) {
        setUser(fbUser);
      } else {
        setUser(false);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      user,
      userLoading: user === null, // as long as user === null, will be true
    }),
    [user],
  );

  return <AuthContext.Provider value={value} {...props} />;
}
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
