import React, { createContext, useState, ReactNode } from 'react';
import { JobOffer } from '../types';

interface JobOfferContextType {
  jobOffer?: JobOffer;
  setJobOffer: (project?: JobOffer) => void;
}

export const JobOfferContext = createContext<JobOfferContextType | undefined>(
  undefined
);

export const JobOfferProvider = ({ children }: { children: ReactNode }) => {
  const [jobOffer, setJobOffer] = useState<JobOffer>();

  return (
    <JobOfferContext.Provider value={{ jobOffer, setJobOffer }}>
      {children}
    </JobOfferContext.Provider>
  );
};
