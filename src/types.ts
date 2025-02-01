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
  languages: Language[];
  lastName: string;
  location: string;
  interests?: string[];
  socialMedias?: SocialMedia[];
  projects?: Project[];
  experiences?: Experience[];
  user: User;
}

export interface Company {
  jobOffers?: JobOffer[];
  name: string;
  user: User;
}

export interface Experience {
  id: number;
  name: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  skills?: Skill[];
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
  company_name: string;
  date: string;
  body: string;
  id: string;
  image?: string;
  title: string;
  languages: Language[];
  address: string;
  experiences?: Experience[];
  education: Diploma[];
  location_type: 'remote' | 'onsite' | 'hybrod';
  skills: Skill[];
  status: 'open' | 'pending' | 'closed';
  min_salary: number;
  max_salary: number;
  numberOfApplicants: number;
}
export interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  skills: Skill[];
  date: string;
}
export interface Skill {
  id: number;
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

export interface Language {
  id: number;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'native';
}

export interface Diploma {
  id: number;
  domain: string;
  diploma: 'bachelor' | 'master' | 'phd' | 'licence' | 'doctorat';
}

export interface ManagerProps {
  handleChange: (name: string, value: any) => void;
}

export interface DiplomaManagerProps extends ManagerProps {
  initialDiplomas: Diploma[];
}
