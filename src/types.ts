export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'softskills' | 'software';
}

export interface MenuOption {
  name: string;
  onPress: () => void;
}
