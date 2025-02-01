import type { Experience as ExperienceType } from '@/src/types';
import { View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import RoundedButton from '../ui/RoundedButton';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useExperience } from '@/src/hooks/useExperience';

interface ExperienceDisplayerProps {
  experiences: ExperienceType[];
}

const ExperienceDisplayer = (props: ExperienceDisplayerProps) => {
  const { experiences } = props;
  const itemColor = useThemeColor({}, 'ui-items');
  const iconColor = useThemeColor({}, 'text');
  const buttonColor = useThemeColor({}, 'ui-buttons');

  const router = useRouter();
  const { setExperience } = useExperience();

  const handleEdit = (experience?: ExperienceType) => {
    console.log(experience);
    if (experience) setExperience(experience);
    else setExperience();
    router.push('/(candidate)/profile/edit-experience');
  };

  return (
    <ExperienceContainer>
      {experiences.map((experience, index) => {
        return (
          <ExperienceItem color={itemColor} key={index}>
            <InfoContainer>
              <ThemedText type="defaultSemiBold">{experience.name}</ThemedText>
              <ThemedText type="default">{experience.description}</ThemedText>
              <ThemedText type="default">
                {experience.startDate} | {experience.endDate}
              </ThemedText>
            </InfoContainer>
            <EditButtonContainer>
              <RoundedButton
                size={32}
                color={buttonColor}
                icon={<Feather name="edit-3" size={16} color={iconColor} />}
                onPress={() => handleEdit(experience)}
              />
            </EditButtonContainer>
          </ExperienceItem>
        );
      })}
      <ButtonContainer>
        <RoundedButton
          size={40}
          color={itemColor}
          icon={<Feather name="plus" size={24} color={iconColor} />}
          onPress={() => handleEdit()}
        />
      </ButtonContainer>
    </ExperienceContainer>
  );
};

export default ExperienceDisplayer;

const ButtonContainer = styled(View)`
  margin-top: 16px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4;
  elevation: 5;
`;

const ExperienceContainer = styled(View)``;

const ExperienceItem = styled(View)<{ color: string }>`
  background-color: ${(props) => props.color};
  margin-top: 8px;
  padding: 8px;
  border-radius: 8px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 4;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4;
  flex-direction: row;
  align-items: center;
`;

const InfoContainer = styled(View)``;

const EditButtonContainer = styled(View)`
  position: absolute;
  right: 16;
`;
