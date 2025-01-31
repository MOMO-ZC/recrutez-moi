import React, { createContext, useContext, useState } from 'react';
import { Language as LanguageType } from '@/src/types';

export interface LanguageContextType {
  languages: LanguageType[];
  addLanguage: (language: LanguageType) => void;
  removeLanguage: (name: string) => void;
  setLanguages: (languages: LanguageType[]) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [languages, setLanguages] = useState<LanguageType[]>([]);

  const addLanguage = (language: LanguageType) => {
    if (!languages.some((s) => s.name === language.name)) {
      setLanguages([...languages, language]);
    }
  };

  const removeLanguage = (name: string) => {
    setLanguages(languages.filter((language) => language.name !== name));
  };

  return (
    <LanguageContext.Provider
      value={{ languages, addLanguage, removeLanguage, setLanguages }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
