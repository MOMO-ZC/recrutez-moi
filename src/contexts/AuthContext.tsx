import React, { createContext, useState, ReactNode, useEffect } from 'react';
import {
  saveAuthToken,
  getAuthToken,
  clearAuthToken,
} from '../services/authService';
import {
  saveVector,
  getVector,
  clearVector,
} from '../services/embeddingService';

interface AuthContextType {
  authToken: string | null;
  id: string | null;
  role: 'candidate' | 'company' | undefined;
  embeddingVector: number[];
  login: (token: string, id: string, role: 'candidate' | 'company') => void;
  logout: () => void;
  updateVector: (vector: number[]) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [embeddingVector, setEmbeddingVector] = useState<number[]>([]);
  const [id, setId] = useState<string | null>(null);
  const [role, setRole] = useState<'candidate' | 'company' | undefined>();

  useEffect(() => {
    const loadToken = async () => {
      const token = await getAuthToken();
      const vector = await getVector();

      if (token) {
        setAuthToken(token);
        setEmbeddingVector(vector);
      }
    };
    loadToken();
  }, []);

  const login = async (
    token: string,
    id: string,
    role: 'candidate' | 'company'
  ): Promise<void> => {
    const vector = await getVector();
    setId(id);
    setRole(role);
    await saveAuthToken(token);
    setEmbeddingVector(vector);
    setAuthToken(token);
  };

  const logout = async (): Promise<void> => {
    await clearAuthToken();
    setAuthToken(null);
  };

  const updateVector = async (vector: number[]): Promise<void> => {
    await saveVector(vector);
    setEmbeddingVector(vector);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        embeddingVector,
        id,
        role,
        login,
        logout,
        updateVector,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
