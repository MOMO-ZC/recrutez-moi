import { ScrollView } from 'react-native-gesture-handler';
import FormationDisplayer from '../components/Profile/FormationDisplayer';
import HeaderContainer from '../components/ui/HeaderContainer';
import { formations } from '../mock/candidats';

import ScreenContainer from './common/ScreenContainer';
import { View } from 'react-native';
import styled from 'styled-components';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import { useFormation } from '../hooks/useFormation';
import DynamicForm, { FormField } from '../components/ui/DynamicForm';
import { router } from 'expo-router';

const EditFormationScreen = () => {
  const { formation } = useFormation();

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
      ]
    : [
        { name: 'degree', label: 'Diplôme', type: 'text' },
        { name: 'domain', label: 'Domaine', type: 'text' },
        { name: 'school', label: 'Ecole', type: 'text' },
        { name: 'location', label: 'Lieu', type: 'text' },
        { name: 'startDate', label: 'Date de début', type: 'text' },
        { name: 'endDate', label: 'Date de fin', type: 'text' },
      ];

  const handleEditFormation = () => {
    console.log('Formation edited');
    router.back();
  };

  return (
    <ScreenContainer>
      <ScrollView>
        <HeaderContainer title="Edit Formation" />
        <FormationContainer>
          <DynamicForm
            formStructure={editFormFields}
            label="Edit Formation"
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
  align-self: center;
`;
