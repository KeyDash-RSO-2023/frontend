// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(JSON.parse(localStorage.getItem('session')));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const validUntil = session ? new Date(session.validUntil) : new Date(0);
    const now = new Date();
    setIsLoggedIn(validUntil > now);
  }, [session]);

  return (
    <AuthContext.Provider value={[ isLoggedIn, setIsLoggedIn ]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
