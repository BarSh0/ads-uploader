import React, { useEffect, useState } from 'react';
import { auth } from '../config/firebase';

export const TwitterAuthContext = React.createContext({} as any);

export const TwitterAuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        alert('Something went wrong');
        return;
      }
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = {
    currentUser,
  };

  return <TwitterAuthContext.Provider value={value}>{!loading && children}</TwitterAuthContext.Provider>;
};
