import { Text, View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import { Feather } from '@expo/vector-icons';
import { Experience as ExperienceType } from '@/src/types';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import RoundedButton from './RoundedButton';
import { useJobOfferExperience } from '@/src/hooks/useJobOfferExperience';

interface ExperienceProps {
  experience: ExperienceType;
  editing?: boolean;
}

const Experience = (props: ExperienceProps) => {
  const { removeExperience } = useJobOfferExperience();
  const iconColor = useThemeColor({}, 'text');
  const { experience, editing } = props;
  const { name } = experience;
  const main = useThemeColor({}, 'main');
  return (
    <ExperienceContainer color={main}>
      <ExperienceName>{name}</ExperienceName>
      {editing && (
        <IconWrapper>
          <RoundedButton
            size={16}
            color={'transparent'}
            icon={<Feather name="x" size={16} color={iconColor} />}
            onPress={() => removeExperience(name)}
          />
        </IconWrapper>
      )}
    </ExperienceContainer>
  );
};

export default Experience;

const ExperienceContainer = styled(View)<{ color: string }>`
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

const ExperienceName = styled(ThemedText)`
  padding-right: 2px;
`;
