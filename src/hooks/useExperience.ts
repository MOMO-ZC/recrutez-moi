import { useContext } from 'react';
import { ExperienceContext } from '../contexts/ExperienceContext';

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within a ExperienceProvider');
  }
  return context;
};
