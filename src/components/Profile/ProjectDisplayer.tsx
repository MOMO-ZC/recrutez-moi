import type { Project as ProjectType } from '@/src/types';
import { View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import RoundedButton from '../ui/RoundedButton';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useProject } from '@/src/hooks/useProject';

interface ProjectDisplayerProps {
  projects: ProjectType[];
}

const ProjectDisplayer = (props: ProjectDisplayerProps) => {
  const { projects } = props;
  const itemColor = useThemeColor({}, 'ui-items');
  const iconColor = useThemeColor({}, 'text');
  const buttonColor = useThemeColor({}, 'ui-buttons');

  const router = useRouter();
  const { setProject } = useProject();

  const handleEdit = (project?: ProjectType) => {
    console.log(project);
    if (project) setProject(project);
    else setProject();
    router.push('/(candidate)/profile/edit-project');
  };

  return (
    <ProjectContainer>
      {projects &&
        projects.map((project, index) => {
          return (
            <ProjectItem color={itemColor} key={index}>
              <InfoContainer>
                <ThemedText type="defaultSemiBold">{project.name}</ThemedText>
                <ThemedText type="default">{project.type}</ThemedText>
              </InfoContainer>
              <EditButtonContainer>
                <RoundedButton
                  size={32}
                  color={buttonColor}
                  icon={<Feather name="edit-3" size={16} color={iconColor} />}
                  onPress={() => handleEdit(project)}
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
          onPress={() => handleEdit()}
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
