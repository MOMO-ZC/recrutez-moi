import React, { createContext, useContext, ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { HeaderProvider } from './HeaderContext';
import { FormationProvider } from './FormationContext';
import { JobOfferProvider } from './JobOfferContext';
import { ProjectProvider } from './ProjectContext';
import { SkillProvider } from './SkillContext';
import { LanguageProvider } from './LanguageContext';

interface GlobalContextProps {
  children: ReactNode;
}

const GlobalContext = createContext({});

export const GlobalProvider: React.FC<GlobalContextProps> = ({ children }) => {
  return (
    <AuthProvider>
      <HeaderProvider>
        <FormationProvider>
          <JobOfferProvider>
            <ProjectProvider>
              <SkillProvider>
                <LanguageProvider>{children}</LanguageProvider>
              </SkillProvider>
            </ProjectProvider>
          </JobOfferProvider>
        </FormationProvider>
      </HeaderProvider>
    </AuthProvider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
