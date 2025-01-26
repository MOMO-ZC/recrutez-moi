import { Text, View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import { Feather } from '@expo/vector-icons';
import { Skill as SkillType } from '@/src/types';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import RoundedButton from './RoundedButton';
import { useSkill } from '@/src/hooks/useSkill';

interface SkillProps {
  skill: SkillType;
  editing?: boolean;
}

const categoryIcons: Record<string, keyof typeof Feather.glyphMap> = {
  framework: 'code',
  'programming language': 'cpu',
  softskills: 'users',
  software: 'monitor',
  infrastructure: 'server',
};

const Skill = (props: SkillProps) => {
  const { removeSkill } = useSkill();
  const iconColor = useThemeColor({}, 'text');
  const { skill, editing } = props;
  const { category, name } = skill;
  const framework = useThemeColor({}, 'framework');
  const softskills = useThemeColor({}, 'softskills');
  const software = useThemeColor({}, 'software');
  const programming = useThemeColor({}, 'programming language');
  const infrastructure = useThemeColor({}, 'infrastructure');
  const colors = {
    framework,
    'programming language': programming,
    softskills,
    software,
    infrastructure,
  };
  return (
    <SkillContainer color={colors[category]}>
      <IconWrapper>
        <Feather name={categoryIcons[category]} size={16} color={iconColor} />
      </IconWrapper>
      <SkillName>{name}</SkillName>
      {editing && (
        <IconWrapper>
          <RoundedButton
            size={16}
            color={'transparent'}
            icon={<Feather name="x" size={16} color={iconColor} />}
            onPress={() => removeSkill(name)}
          />
        </IconWrapper>
      )}
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
