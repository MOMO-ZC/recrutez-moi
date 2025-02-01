import { ScrollView } from 'react-native-gesture-handler';
import HeaderContainer from '../../components/ui/HeaderContainer';

import ScreenContainer from '../common/ScreenContainer';
import { View } from 'react-native';
import styled from 'styled-components';
import { useExperience } from '../../hooks/useExperience';
import DynamicForm, { FormField } from '../../components/ui/DynamicForm';
import { router } from 'expo-router';
import { useSkill } from '../../hooks/useSkill';
import { useEffect } from 'react';

const EditExperienceScreen = () => {
  const { experience } = useExperience();
  const { setSkills } = useSkill();

  useEffect(() => {
    setSkills(experience?.skills || []);
  }, [experience]);

  const editFormFields: FormField[] = experience
    ? [
        {
          name: 'title',
          label: 'Title',
          placeholder: experience.name,
          type: 'text',
          value: experience.name,
        },
        {
          name: 'description',
          label: 'Description',
          placeholder: experience.description,
          type: 'longText',
          value: experience.description,
        },
        {
          name: 'startDate',
          label: 'Starting Date',
          placeholder: experience.startDate,
          type: 'text',
          value: experience.startDate,
        },
        {
          name: 'endDate',
          label: 'Ending Date',
          placeholder: experience.endDate,
          type: 'text',
          value: experience.endDate,
        },
        {
          name: 'skills',
          label: 'Skills',
          type: 'skills',
          value: experience.skills,
        },
      ]
    : [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'date', label: 'Date', type: 'text' },
        { name: 'skills', label: 'Skills', type: 'skills' },
      ];

  const handleEditExperience = async (formData: { [key: string]: any }) => {
    router.back();
  };

  return (
    <ScreenContainer>
      <HeaderContainer title="Edit Experience" />
      <ScrollView>
        <ExperienceContainer>
          <DynamicForm
            formStructure={editFormFields}
            label={experience ? 'Edit Experience' : 'Add Experience'}
            onSubmit={handleEditExperience}
          />
        </ExperienceContainer>
      </ScrollView>
    </ScreenContainer>
  );
};

export default EditExperienceScreen;

const ExperienceContainer = styled(View)`
  margin-top: 16px;
  align-items: center;
  margin-bottom: 128px;
`;
