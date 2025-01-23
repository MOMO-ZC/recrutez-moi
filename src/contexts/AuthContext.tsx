import React, { createContext, useState, ReactNode, useEffect } from 'react';
import {
  saveAuthToken,
  getAuthToken,
  clearAuthToken,
} from '../services/authService';

interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await getAuthToken();
      if (token) {
        setAuthToken(token);
      }
    };
    loadToken();
  }, []);

  const login = async (token: string): Promise<void> => {
    await saveAuthToken(token);
    setAuthToken(token);
  };

  const logout = async (): Promise<void> => {
    await clearAuthToken();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
