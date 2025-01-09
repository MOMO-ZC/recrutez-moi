import { Text, View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import { Feather } from '@expo/vector-icons';
import { Skill as SkillType } from '@/src/types';

interface SkillProps {
  skill: SkillType;
}

const colors = {
  framework: '#118AB2',
  'programming-language': '#EF476F',
  softskills: '#06D6A0',
  software: '#FFD166',
};

const categoryIcons: Record<string, keyof typeof Feather.glyphMap> = {
  framework: 'code',
  'programming-language': 'cpu',
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
      <SkillName>{name}</SkillName>
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
  padding: 4px;
  margin: 4px;
`;

const IconWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 2px;
`;

const SkillName = styled(Text)`
  color: #222222;
  font-size: 14px;
  padding-right: 2px;
`;
