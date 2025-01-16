import { useContext } from 'react';
import { HeaderContext } from '../contexts/HeaderContext';

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
