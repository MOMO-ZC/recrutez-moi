import { ImageSourcePropType } from 'react-native';

export interface AuthSuccess {
  token: string;
  user: User;
}
export interface Candidate {
  avatar?: ImageSourcePropType;
  bio: string;
  birthDate: string;
  firstName: string;
  formations?: Formation[];
  jobOffers?: JobOffer[];
  languages: string[];
  lastName: string;
  location: string;
  interests?: string[];
  socialMedias?: SocialMedia[];
  projects?: Project[];
  user: User;
}

export interface Company {
  jobOffers?: JobOffer[];
  name: string;
  user: User;
}

export interface Formation {
  degree: string;
  domain: string;
  endDate: string;
  id: string;
  location: string;
  title: string;
  startDate: string;
  school: string;
  skills: Skill[];
}
export interface MenuOption {
  name: string;
  icon?: () => JSX.Element;
  onPress: () => void;
}
export interface JobOffer {
  company: string;
  date: string;
  body: string;
  id: string;
  image?: ImageSourcePropType;
  title: string;
  location: string;
  skills: Skill[];
  status: 'open' | 'closed';
  minSalary: number;
  maxSalary: number;
  remote: boolean;
  numberOfApplicants: number;
}
export interface Project {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
  date: string;
}
export interface Skill {
  name: string;
  category:
    | 'framework'
    | 'infrastructure'
    | 'programming language'
    | 'softskills'
    | 'software';
}
export interface SocialMedia {
  name:
    | 'linkedin'
    | 'github'
    | 'twitter'
    | 'facebook'
    | 'codingame'
    | 'hackerrank'
    | 'stackoverflow'
    | 'gitlab'
    | 'rootme'
    | 'discord'
    | 'slack'
    | 'codewars';
  url: string;
  icon: string;
}
export interface User {
  id: string;
  email: string;
  role: 'candidate' | 'company';
}

export interface UserLogin {
  email: string;
  password: string;
}
