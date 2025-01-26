import { useContext } from 'react';
import { SkillContext, SkillContextType } from '../contexts/SkillContext';

export const useSkill = (): SkillContextType => {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error('useSkillContext must be used within a SkillProvider');
  }
  return context;
};
