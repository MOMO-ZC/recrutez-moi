import { ScrollView } from 'react-native-gesture-handler';
import HeaderContainer from '../../components/ui/HeaderContainer';

import ScreenContainer from '../common/ScreenContainer';
import { View } from 'react-native';
import styled from 'styled-components';
import { useJobOffer } from '../../hooks/useJobOffer';
import DynamicForm, { FormField } from '../../components/ui/DynamicForm';
import { router } from 'expo-router';
import { useSkill } from '../../hooks/useSkill';
import { useEffect } from 'react';
import { API } from '@/src/const';
import { LANGUAGE } from '@/src/constants/language';
import { useLanguage } from '@/src/hooks/useLanguage';

const EditJobOfferScreen = () => {
  const { jobOffer } = useJobOffer();
  const { setSkills } = useSkill();
  const { setLanguages } = useLanguage();

  useEffect(() => {
    setSkills(jobOffer?.skills || []);
    setLanguages(jobOffer?.languages || []);
  }, [jobOffer]);

  const editFormFields: FormField[] = jobOffer
    ? [
        {
          name: 'title',
          label: 'Title',
          placeholder: jobOffer.title,
          type: 'text',
          value: jobOffer.title,
        },
        {
          name: 'body',
          label: 'Description',
          placeholder: jobOffer.body,
          type: 'longText',
          value: jobOffer.body,
        },
        {
          name: 'minSalary',
          label: 'Minimum Salary',
          placeholder: jobOffer.minSalary.toString(),
          type: 'number',
          value: jobOffer.minSalary.toString(),
        },
        {
          name: 'maxSalary',
          label: 'Maximum Salary',
          placeholder: jobOffer.maxSalary.toString(),
          type: 'number',
          value: jobOffer.maxSalary.toString(),
        },
        {
          name: 'city',
          label: 'City',
          placeholder: jobOffer.location.split(',')[0], 
          type: 'text',
          value: jobOffer.location.split(',')[0],
        },
        {
          name: 'country',
          label: 'Country',
          placeholder: jobOffer.location.split(',')[1],
          type: 'text',
          value: jobOffer.location.split(',')[1],
        },
        {
          name: 'languages',
          label: 'Languages',
          type: 'languages',
          value: jobOffer.languages,
        },
        {
          name: 'skills',
          label: 'Skills',
          type: 'skills',
          value: jobOffer.skills,
        },
      ]
    : [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'body', label: 'Description', type: 'text' },
        { name: 'date', label: 'Date', type: 'text' },
        {name: 'minSalary', label: 'Minimum Salary', type: 'number'},
        {name: 'maxSalary', label: 'Maximum Salary', type: 'number'},
        { name: 'city', label: 'City', type: 'text' },
        { name: 'country', label: 'Country', type: 'text' },
        { name: 'languages', label: 'Languages', type: 'languages' },
        { name: 'skills', label: 'Skills', type: 'skills' },
      ];

  const handleEditJobOffer = async (formData: { [key: string]: any }) => {
    if(jobOffer) {
      const {id} = jobOffer;
      try {
        const response = await fetch(`${API}/offers/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          console.error('Error during job offer update');
        }
      } catch (error) {
        console.error(error);
    }
  }

    router.back();
  };

  return (
    <ScreenContainer>
      <HeaderContainer title="Edit JobOffer" />
      <ScrollView>
        <JobOfferContainer>
          <DynamicForm
            formStructure={editFormFields}
            label="Edit JobOffer"
            onSubmit={handleEditJobOffer}
          />
        </JobOfferContainer>
      </ScrollView>
    </ScreenContainer>
  );
};

export default EditJobOfferScreen;

const JobOfferContainer = styled(View)`
  margin-top: 16px;
  align-items: center;
  margin-bottom: 128px;
`;
