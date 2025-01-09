import { Text, View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import { Feather } from '@expo/vector-icons';
import { Skill as SkillType } from '@/src/types';

interface SkillProps {
  skill: SkillType;
}

const colors = {
  frontend: '#118AB2',
  backend: '#EF476F',
  softskills: '#06D6A0',
  software: '#FFD166',
};

const categoryIcons: Record<string, keyof typeof Feather.glyphMap> = {
  frontend: 'code',
  backend: 'cpu',
  softskills: 'users',
  software: 'monitor',
};

const Skill = (props: SkillProps) => {
  const { skill } = props;
  const { category, name } = skill;
  return (
    <SkillContainer color={colors[category]}>
      <IconWrapper>
        <Feather name={categoryIcons[category]} size={16} color="#222222" />
      </IconWrapper>
      <Text>{name}</Text>
    </SkillContainer>
  );
};

export default Skill;

const SkillContainer = styled(View)<{ color: string }>`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 12px;
  height: 32px;
  background-color: ${(props) => props.color};
  padding: 8px;
  margin: 4px;
`;

const IconWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 2px;
`;
