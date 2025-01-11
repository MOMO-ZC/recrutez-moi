import { Formation, Project, Skill } from '../types';

export const getUniqueSkills = (
  formations: Formation[],
  projects: Project[]
) => {
  const skills: Skill[] = [];
  const skillSet = new Set<string>();

  [formations, projects].forEach((collection) => {
    if (collection) {
      collection.forEach((item) => {
        if (item.skills) {
          item.skills.forEach((skill) => {
            const skillKey = skill.name;
            if (!skillSet.has(skillKey)) {
              skillSet.add(skillKey);
              skills.push(skill);
            }
          });
        }
      });
    }
  });

  return skills.sort((a, b) => a.category.localeCompare(b.category));
};
