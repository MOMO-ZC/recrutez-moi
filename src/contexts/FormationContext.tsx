import React, { createContext, useState, ReactNode } from 'react';
import { Formation } from '../types';

interface FormationContextType {
  formation?: Formation;
  setFormation: (formation?: Formation) => void;
}

export const FormationContext = createContext<FormationContextType | undefined>(
  undefined
);

export const FormationProvider = ({ children }: { children: ReactNode }) => {
  const [formation, setFormation] = useState<Formation>();

  return (
    <FormationContext.Provider value={{ formation, setFormation }}>
      {children}
    </FormationContext.Provider>
  );
};
