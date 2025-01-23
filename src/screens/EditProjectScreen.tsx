import { ScrollView } from 'react-native-gesture-handler';
import HeaderContainer from '../components/ui/HeaderContainer';

import ScreenContainer from './common/ScreenContainer';
import { View } from 'react-native';
import styled from 'styled-components';
import { useProject } from '../hooks/useProject';
import DynamicForm, { FormField } from '../components/ui/DynamicForm';
import { router } from 'expo-router';

const EditProjectScreen = () => {
  const { project } = useProject();

  const editFormFields: FormField[] = project
    ? [
        {
          name: 'title',
          label: 'Titre',
          placeholder: project.title,
          type: 'text',
          value: project.title,
        },
        {
          name: 'description',
          label: 'Description',
          placeholder: project.description,
          type: 'text',
          value: project.description,
        },
      ]
    : [
        {
          name: 'title',
          label: 'Titre',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
        },
      ];

  const handleEditProject = () => {
    console.log('Project edited');
    router.back();
  };

  return (
    <ScreenContainer>
      <ScrollView>
        <HeaderContainer title="Edit Project" />
        <ProjectContainer>
          <DynamicForm
            formStructure={editFormFields}
            label="Edit Project"
            onSubmit={handleEditProject}
          />
        </ProjectContainer>
      </ScrollView>
    </ScreenContainer>
  );
};

export default EditProjectScreen;

const ProjectContainer = styled(View)`
  margin-top: 16px;
  align-self: center;
`;
