import { JobOffer } from '../types';

export const jobOffers: JobOffer[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    description: `
        We are looking for a frontend developer with experience in React. The ideal candidate should have at least 2 years of experience in React and be able to work in a team. The candidate should also have experience with Photoshop and Figma. The candidate should be able to work remotely and be available to start in January 2025. 
        We are looking for a frontend developer with experience in React. The ideal candidate should have at least 2 years of experience in React and be able to work in a team. The candidate should also have experience with Photoshop and Figma. The candidate should be able to work remotely and be available to start in January 2025.`,
    company: 'Google',
    location: 'Los Angeles, CA',
    skills: [
      {
        name: 'React',
        category: 'framework',
      },
      { name: 'Typescript', category: 'programming language' },
      { name: 'Javascript', category: 'programming language' },
      { name: 'Node.js', category: 'programming language' },
      { name: 'AGILE', category: 'softskills' },
      { name: 'Git', category: 'software' },
      { name: 'Cloud Computing', category: 'software' },
      {
        name: 'Teamwork',
        category: 'softskills',
      },
      {
        name: 'Photoshop',
        category: 'software',
      },
      {
        name: 'Figma',
        category: 'software',
      },
    ],
    salary: 50000,
    remote: true,
    date: '2025-1-10',
  },
  {
    id: '2',
    title: 'Backend Developer',
    description:
      'We are looking for a backend developer with experience in Node.js',
    company: 'Facebook',
    location: 'New York, NY',
    skills: [
      {
        name: 'Node.js',
        category: 'programming language',
      },
      {
        name: 'Teamwork',
        category: 'softskills',
      },
      {
        name: 'Photoshop',
        category: 'software',
      },
    ],
    salary: 60000,
    remote: true,
    date: '2025-1-10',
  },
  {
    id: '3',
    title: 'Fullstack Developer',
    description:
      'We are looking for a fullstack developer with experience in React and Node.js',
    company: 'Amazon',
    location: 'Seattle, WA',
    skills: [
      {
        name: 'React',
        category: 'framework',
      },
      {
        name: 'Node.js',
        category: 'programming language',
      },
      {
        name: 'Teamwork',
        category: 'softskills',
      },
      {
        name: 'Photoshop',
        category: 'software',
      },
    ],
    salary: 70000,
    remote: false,
    date: '2025-1-10',
  },
];
