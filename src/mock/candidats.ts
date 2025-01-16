import type { Candidate, Formation, Project, Skill, User } from '../types';

const formationSkills: Skills[] = [
  {
    skills: [
      {
        name: 'Java',
        category: 'programming-language',
      },
      {
        name: 'Python',
        category: 'programming-language',
      },
      {
        name: 'React',
        category: 'framework',
      },
      {
        name: 'Angular',
        category: 'framework',
      },
      {
        name: 'Teamwork',
        category: 'softskills',
      },
      {
        name: 'Communication',
        category: 'softskills',
      },
      {
        name: 'Photoshop',
        category: 'software',
      },
      {
        name: 'Illustrator',
        category: 'software',
      },
    ],
  },
  {
    skills: [
      {
        name: 'C',
        category: 'programming-language',
      },
      {
        name: 'C#',
        category: 'programming-language',
      },
      {
        name: 'Vue',
        category: 'framework',
      },
      {
        name: 'Photoshop',
        category: 'software',
      },
      {
        name: 'AGILE',
        category: 'softskills',
      },
      {
        name: 'Communication',
        category: 'softskills',
      },
      {
        name: 'Figma',
        category: 'software',
      },
    ],
  },
  {
    skills: [
      {
        name: 'TypeScript',
        category: 'programming-language',
      },
      {
        name: 'NodeJS',
        category: 'programming-language',
      },
      {
        name: 'React-Native',
        category: 'framework',
      },
      {
        name: 'Git',
        category: 'software',
      },
      {
        name: 'AGILE',
        category: 'softskills',
      },
      {
        name: 'Figma',
        category: 'software',
      },
    ],
  },
];

export const formations: Formation[] = [
  {
    degree: 'Master',
    domain: 'Computer Science',
    endDate: '2015-01-01',
    id: '1',
    location: 'Paris, France',
    title: 'Master in Computer Science',
    startDate: '2013-01-01',
    school: 'EFREI',
    skills: formationSkills[0].skills,
  },
  {
    degree: 'Bachelor',
    domain: 'Computer Science',
    endDate: '2013-01-01',
    id: '2',
    location: 'Paris, France',
    title: 'Bachelor in Computer Science',
    startDate: '2010-01-01',
    school: 'EFREI',
    skills: formationSkills[1].skills,
  },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'PFM',
    description: 'Mobiel App for meal preps',
    skills: formationSkills[2].skills,
    date: '2024-01-01',
  },
  {
    id: '2',
    title: 'Project 2',
    description: 'This is a project description',
    skills: formationSkills[0].skills,
    date: '2021-01-01',
  },
  {
    id: '3',
    title: 'Project 3',
    description: 'This is a project description',
    skills: formationSkills[1].skills,
    date: '2021-01-01',
  },
];

interface Skills {
  skills: Skill[];
}

export const users: User[] = [
  {
    id: '1',
    email: 'jhon.doe@example.com',
    role: 'candidate',
  },
];

export const candidates: Candidate[] = [
  {
    bio: 'I am a software engineer with 10 years of experience.',
    birthDate: '1990-01-01',
    firstName: 'John',
    formations,
    languages: ['English', 'French'],
    lastName: 'Doe',
    location: 'Paris',
    interests: ['Music', 'Sport'],
    projects,

    user: users[0],
  },
];
