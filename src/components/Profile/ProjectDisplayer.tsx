import type { Project as ProjectType } from '@/src/types';
import { View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import RoundedButton from '../ui/RoundedButton';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

interface ProjectDisplayerProps {
  projects: ProjectType[];
}

const ProjectDisplayer = (props: ProjectDisplayerProps) => {
  const { projects } = props;
  const itemColor = useThemeColor({}, 'ui-items');
  const iconColor = useThemeColor({}, 'text');
  const buttonColor = useThemeColor({}, 'ui-buttons');

  return (
    <ProjectContainer>
      {projects.map((project, index) => {
        return (
          <ProjectItem color={itemColor} key={index}>
            <InfoContainer>
              <ThemedText type="defaultSemiBold">{project.title}</ThemedText>
              <ThemedText type="default">{project.description}</ThemedText>
              <ThemedText type="default">{project.date}</ThemedText>
            </InfoContainer>
            <EditButtonContainer>
              <RoundedButton
                size={32}
                color={buttonColor}
                icon={<Feather name="edit-3" size={16} color={iconColor} />}
                onPress={() => router.push('/(tabs)/profile/edit-formation')}
              />
            </EditButtonContainer>
          </ProjectItem>
        );
      })}
      <ButtonContainer>
        <RoundedButton
          size={40}
          color={itemColor}
          icon={<Feather name="plus" size={24} color={iconColor} />}
          onPress={() => router.push('/(tabs)/profile/edit-formation')}
        />
      </ButtonContainer>
    </ProjectContainer>
  );
};

export default ProjectDisplayer;

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

const ProjectContainer = styled(View)``;

const ProjectItem = styled(View)<{ color: string }>`
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
