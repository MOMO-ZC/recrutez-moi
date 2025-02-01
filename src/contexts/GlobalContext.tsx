import React, { createContext, useContext, ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { HeaderProvider } from './HeaderContext';
import { FormationProvider } from './FormationContext';
import { JobOfferProvider } from './JobOfferContext';
import { ProjectProvider } from './ProjectContext';
import { SkillProvider } from './SkillContext';
import { LanguageProvider } from './LanguageContext';
import { ExperienceProvider } from './ExperienceContext';
import { JobOfferExperienceProvider } from './JobOfferExperienceContext';

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
              <ExperienceProvider>
                <SkillProvider>
                  <JobOfferExperienceProvider>
                    <LanguageProvider>{children}</LanguageProvider>
                  </JobOfferExperienceProvider>
                </SkillProvider>
              </ExperienceProvider>
            </ProjectProvider>
          </JobOfferProvider>
        </FormationProvider>
      </HeaderProvider>
    </AuthProvider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
