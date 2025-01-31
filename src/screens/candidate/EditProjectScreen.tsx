import { ScrollView } from 'react-native-gesture-handler';
import HeaderContainer from '../../components/ui/HeaderContainer';

import ScreenContainer from '../common/ScreenContainer';
import { View } from 'react-native';
import styled from 'styled-components';
import { useProject } from '../../hooks/useProject';
import DynamicForm, { FormField } from '../../components/ui/DynamicForm';
import { router } from 'expo-router';
import SkillDisplayer from '../../components/ui/SkillDisplayer';
import { useSkill } from '../../hooks/useSkill';
import { useEffect } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';

const EditProjectScreen = () => {
  const { project } = useProject();
  const { setSkills } = useSkill();

  useEffect(() => {
    setSkills(project?.skills || []);
  }, [project]);

  const editFormFields: FormField[] = project
    ? [
        {
          name: 'title',
          label: 'Title',
          placeholder: project.title,
          type: 'text',
          value: project.title,
        },
        {
          name: 'description',
          label: 'Description',
          placeholder: project.description,
          type: 'longText',
          value: project.description,
        },
        {
          name: 'date',
          label: 'Date',
          placeholder: project.date,
          type: 'text',
          value: project.date,
        },
        {
          name: 'skills',
          label: 'Skills',
          type: 'skills',
          value: project.skills,
        },
      ]
    : [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'date', label: 'Date', type: 'text' },
        { name: 'skills', label: 'Skills', type: 'skills' },
      ];

  const handleEditProject = async (formData: { [key: string]: any }) => {
    router.back();
  };

  return (
    <ScreenContainer>
      <HeaderContainer title="Edit Project" />
      <ScrollView>
        <ProjectContainer>
          <DynamicForm
            formStructure={editFormFields}
            label={project ? 'Edit Project' : 'Add Project'}
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
  align-items: center;
  margin-bottom: 128px;
`;
