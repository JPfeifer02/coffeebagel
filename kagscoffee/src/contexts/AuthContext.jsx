import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage or cookies
    const checkAuthStatus = async () => {
      try {
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const signIn = async (email, password) => {
    try {
      const user = await authService.signIn(email, password);
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authService.signOut();
      setCurrentUser(null);
    } catch (error) {
      throw error;
    }
  };

  const createAccount = async (userData) => {
    try {
      const user = await authService.createAccount(userData);
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    currentUser,
    signIn,
    signOut,
    createAccount,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};