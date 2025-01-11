import { Text, View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import { Feather } from '@expo/vector-icons';
import { Skill as SkillType } from '@/src/types';
import { useThemeColor } from '@/src/hooks/useThemeColor';

interface SkillProps {
  skill: SkillType;
}

const categoryIcons: Record<string, keyof typeof Feather.glyphMap> = {
  framework: 'code',
  'programming-language': 'cpu',
  softskills: 'users',
  software: 'monitor',
};

const Skill = (props: SkillProps) => {
  const iconColor = useThemeColor({}, 'text');
  const { skill } = props;
  const { category, name } = skill;
  const main = useThemeColor({}, 'main');
  const secondary = useThemeColor({}, 'secondary');
  const success = useThemeColor({}, 'success');
  const warning = useThemeColor({}, 'warning');
  const danger = useThemeColor({}, 'danger');
  const colors = {
    framework: secondary,
    'programming-language': danger,
    softskills: success,
    software: warning,
  };
  return (
    <SkillContainer color={colors[category]}>
      <IconWrapper>
        <Feather name={categoryIcons[category]} size={16} color={iconColor} />
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

const SkillName = styled(ThemedText)`
  padding-right: 2px;
`;
