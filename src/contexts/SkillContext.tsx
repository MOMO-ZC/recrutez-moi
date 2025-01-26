import React, { createContext, useContext, useState } from 'react';
import { Skill as SkillType } from '@/src/types';

export interface SkillContextType {
  skills: SkillType[];
  addSkill: (skill: SkillType) => void;
  removeSkill: (name: string) => void;
  setSkills: (skills: SkillType[]) => void;
}

export const SkillContext = createContext<SkillContextType | undefined>(
  undefined
);

export const SkillProvider = ({ children }: { children: React.ReactNode }) => {
  const [skills, setSkills] = useState<SkillType[]>([]);

  const addSkill = (skill: SkillType) => {
    if (!skills.some((s) => s.name === skill.name)) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (name: string) => {
    setSkills(skills.filter((skill) => skill.name !== name));
  };

  return (
    <SkillContext.Provider value={{ skills, addSkill, removeSkill, setSkills }}>
      {children}
    </SkillContext.Provider>
  );
};
