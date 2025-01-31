import { ScrollView } from 'react-native-gesture-handler';
import HeaderContainer from '../../components/ui/HeaderContainer';

import ScreenContainer from '../common/ScreenContainer';
import { View } from 'react-native';
import styled from 'styled-components';
import { useFormation } from '../../hooks/useFormation';
import DynamicForm, { FormField } from '../../components/ui/DynamicForm';
import { router } from 'expo-router';
import { useSkill } from '../../hooks/useSkill';
import { useEffect } from 'react';

const EditFormationScreen = () => {
  const { formation } = useFormation();
  const { setSkills } = useSkill();

  useEffect(() => {
    setSkills(formation?.skills || []);
  }, [formation]);

  const editFormFields: FormField[] = formation
    ? [
        {
          name: 'degree',
          label: 'Diplôme',
          placeholder: formation.degree,
          type: 'text',
          value: formation.degree,
        },
        {
          name: 'domain',
          label: 'Domaine',
          placeholder: formation.domain,
          type: 'text',
          value: formation.domain,
        },
        {
          name: 'school',
          label: 'Ecole',
          placeholder: formation.school,
          type: 'text',
          value: formation.school,
        },
        {
          name: 'location',
          label: 'Lieu',
          placeholder: formation.location,
          type: 'text',
          value: formation.location,
        },
        {
          name: 'startDate',
          label: 'Date de début',
          placeholder: formation.startDate,
          type: 'text',
          value: formation.startDate,
        },
        {
          name: 'endDate',
          label: 'Date de fin',
          placeholder: formation.endDate,
          type: 'text',
          value: formation.endDate,
        },
        {
          name: 'skills',
          label: 'Skills',
          type: 'skills',
          value: formation.skills,
        },
      ]
    : [
        { name: 'degree', label: 'Diplôme', type: 'text' },
        { name: 'domain', label: 'Domaine', type: 'text' },
        { name: 'school', label: 'Ecole', type: 'text' },
        { name: 'location', label: 'Lieu', type: 'text' },
        { name: 'startDate', label: 'Date de début', type: 'text' },
        { name: 'endDate', label: 'Date de fin', type: 'text' },
        { name: 'skills', label: 'Skills', type: 'skills' },
      ];

  const handleEditFormation = () => {
    console.log('Formation edited');
    router.back();
  };

  return (
    <ScreenContainer>
      <HeaderContainer title="Edit Formation" />
      <ScrollView>
        <FormationContainer>
          <DynamicForm
            formStructure={editFormFields}
            label={formation ? 'Edit Formation' : 'Add Formation'}
            onSubmit={handleEditFormation}
          />
        </FormationContainer>
      </ScrollView>
    </ScreenContainer>
  );
};

export default EditFormationScreen;

const FormationContainer = styled(View)`
  margin-top: 16px;
  align-items: center;
  margin-bottom: 128px;
`;
