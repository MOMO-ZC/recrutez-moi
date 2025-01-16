import React, { createContext, useState, ReactNode } from 'react';
import { Project } from '../types';

interface ProjectContextType {
  project?: Project;
  setProject: (project?: Project) => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined
);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [project, setProject] = useState<Project>();

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
