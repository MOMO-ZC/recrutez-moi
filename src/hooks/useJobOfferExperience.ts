import { useContext } from 'react';
import {
  JobOfferExperienceContext,
  JobOfferExperienceContextType,
} from '../contexts/JobOfferExperienceContext';

export const useJobOfferExperience = (): JobOfferExperienceContextType => {
  const context = useContext(JobOfferExperienceContext);
  if (!context) {
    throw new Error(
      'useExperienceContext must be used within a ExperienceProvider'
    );
  }
  return context;
};
