import { useContext } from 'react';
import { JobOfferContext } from '../contexts/JobOfferContext';

export const useJobOffer = () => {
  const context = useContext(JobOfferContext);
  if (!context) {
    throw new Error('useJobOffer must be used within a JobOfferProvider');
  }
  return context;
};
