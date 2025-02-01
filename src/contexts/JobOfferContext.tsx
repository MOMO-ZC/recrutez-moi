import React, { createContext, useState, ReactNode } from 'react';
import { Diploma, JobOffer } from '../types';

interface JobOfferContextType {
  jobOffer?: JobOffer;
  setJobOffer: (project?: JobOffer) => void;
  education?: Diploma[];
  setEducation: (education?: Diploma[]) => void;
}

export const JobOfferContext = createContext<JobOfferContextType | undefined>(
  undefined
);

export const JobOfferProvider = ({ children }: { children: ReactNode }) => {
  const [jobOffer, setJobOffer] = useState<JobOffer>();
  const [education, setEducation] = useState<Diploma[]>();

  return (
    <JobOfferContext.Provider
      value={{ jobOffer, setJobOffer, education, setEducation }}
    >
      {children}
    </JobOfferContext.Provider>
  );
};
