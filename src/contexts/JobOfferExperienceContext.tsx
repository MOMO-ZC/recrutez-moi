import React, { createContext, useContext, useState } from 'react';
import { Experience as ExperienceType } from '@/src/types';

export interface JobOfferExperienceContextType {
  experiences: ExperienceType[];
  addExperience: (experience: ExperienceType) => void;
  removeExperience: (name: string) => void;
  setExperiences: (experiences: ExperienceType[]) => void;
}

export const JobOfferExperienceContext = createContext<
  JobOfferExperienceContextType | undefined
>(undefined);

export const JobOfferExperienceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);

  const addExperience = (experience: ExperienceType) => {
    if (!experiences.some((s) => s.name === experience.name)) {
      setExperiences([...experiences, experience]);
    }
  };

  const removeExperience = (name: string) => {
    setExperiences(
      experiences.filter((experience) => experience.name !== name)
    );
  };

  return (
    <JobOfferExperienceContext.Provider
      value={{ experiences, addExperience, removeExperience, setExperiences }}
    >
      {children}
    </JobOfferExperienceContext.Provider>
  );
};
