import React, { createContext, useState, ReactNode } from 'react';
import { Experience } from '../types';

interface ExperienceContextType {
  experience?: Experience;
  setExperience: (project?: Experience) => void;
}

export const ExperienceContext = createContext<
  ExperienceContextType | undefined
>(undefined);

export const ExperienceProvider = ({ children }: { children: ReactNode }) => {
  const [experience, setExperience] = useState<Experience>();

  return (
    <ExperienceContext.Provider value={{ experience, setExperience }}>
      {children}
    </ExperienceContext.Provider>
  );
};
