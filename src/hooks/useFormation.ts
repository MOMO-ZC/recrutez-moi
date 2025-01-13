import { useContext } from 'react';
import { FormationContext } from '../contexts/FormationContext';

export const useFormation = () => {
  const context = useContext(FormationContext);
  if (!context) {
    throw new Error('useFormation must be used within a MenuProvider');
  }
  return context;
};
