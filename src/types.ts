import { ImageSourcePropType } from 'react-native';

export interface Skill {
  name: string;
  category: 'framework' | 'programming-language' | 'softskills' | 'software';
}

export interface MenuOption {
  name: string;
  onPress: () => void;
}

export interface JobOffer {
  id: string;
  image?: ImageSourcePropType;
  title: string;
  description: string;
  company: string;
  location: string;
  skills: Skill[];
  salary: number;
  remote: boolean;
  date: string;
}
