import React, { createContext, useState, ReactNode } from 'react';
import { JobOffer } from '../types';

interface JobOfferContextType {
  project?: JobOffer;
  setJobOffer: (project?: JobOffer) => void;
}

export const JobOfferContext = createContext<JobOfferContextType | undefined>(
  undefined
);

export const JobOfferProvider = ({ children }: { children: ReactNode }) => {
  const [project, setJobOffer] = useState<JobOffer>();

  return (
    <JobOfferContext.Provider value={{ project, setJobOffer }}>
      {children}
    </JobOfferContext.Provider>
  );
};
