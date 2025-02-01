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
import { useLanguage } from '@/src/hooks/useLanguage';
import { useAuth } from '@/src/hooks/useAuth';
import { addJobOffer, editJobOffer } from '@/src/api/jobOffer';
import { Diploma, Experience, Language } from '@/src/types';

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
          name: 'min_salary',
          label: 'Minimum Salary',
          placeholder: jobOffer.min_salary.toString(),
          type: 'number',
          value: jobOffer.min_salary.toString(),
        },
        {
          name: 'max_salary',
          label: 'Maximum Salary',
          placeholder: jobOffer.max_salary.toString(),
          type: 'number',
          value: jobOffer.max_salary.toString(),
        },
        {
          name: 'city',
          label: 'City',
          placeholder: jobOffer.address.split(',')[0],
          type: 'text',
          value: jobOffer.address.split(',')[0],
        },
        {
          name: 'country',
          label: 'Country',
          placeholder: jobOffer.address.split(',')[1],
          type: 'text',
          value: jobOffer.address.split(',')[1],
        },
        {
          name: 'remote',
          label: 'Remote',
          type: 'text',
          placeholder: jobOffer.location_type,
          value: jobOffer.location_type,
        },
        {
          name: 'education',
          label: 'Diploma',
          type: 'diploma',
          value: jobOffer.diplomas,
        },
        {
          name: 'experiences',
          label: 'Experiences',
          type: 'experience',
          value: jobOffer.experiences,
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
        {
          name: 'status',
          label: 'Status',
          type: 'radio',
          value: jobOffer.status,
          options: [
            { label: 'open', value: 'open' },
            { label: 'pending', value: 'pending' },
            { label: 'closed', value: 'closed' },
          ],
        },
      ]
    : [
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'body', label: 'Description', type: 'longText' },
        { name: 'date', label: 'Date', type: 'text' },
        { name: 'min_salary', label: 'Minimum Salary', type: 'number' },
        { name: 'max_salary', label: 'Maximum Salary', type: 'number' },
        { name: 'city', label: 'City', type: 'text' },
        { name: 'country', label: 'Country', type: 'text' },
        { name: 'remote', label: 'Remote', type: 'text' },
        { name: 'education', label: 'Diploma', type: 'diploma' },
        { name: 'experiences', label: 'Experiences', type: 'experience' },
        { name: 'languages', label: 'Languages', type: 'languages' },
        { name: 'skills', label: 'Skills', type: 'skills' },
        {
          name: 'status',
          label: 'Status',
          type: 'radio',
          options: [
            { label: 'open', value: 'open' },
            { label: 'pending', value: 'pending' },
            { label: 'closed', value: 'closed' },
          ],
        },
      ];

  const handleEditJobOffer = async (formData: { [key: string]: any }) => {
    if (jobOffer) {
      const { city, country } = formData;
      formData.address = `${city}, ${country}`;
      formData.remote = formData.remote?.toLowerCase();
      formData.location_type = formData.remote.toLowerCase();
      formData.image =
        'https://us.123rf.com/450wm/delwarbd/delwarbd1807/delwarbd180700694/114944844-belle-ic%C3%B4ne-de-publicit%C3%A9-d-emploi-m%C3%A9ticuleusement-con%C3%A7ue.jpg?ver=6';

      formData.languages = (formData.languages || []).map(
        (language: Language) => ({
          id: language.id,
          level: language.level,
        })
      );
      formData.location_type = formData.remote.toLowerCase();
      formData.skills = (formData.skills || []).map((skill: any) => skill.id);
      formData.education = (formData.diplomas || []).map(
        (education: Diploma) => education.id
      );
      formData.experiences = (formData.experiences || []).map(
        (experience: Experience) => experience.id
      );
      try {
        const response = await editJobOffer(formData, jobOffer.id);
        if (response.status === 200) {
          console.log('JobOffer edited');
        }
      } catch (error) {
        console.error('Error editing jobOffer:', error);
      }
    } else {
      const { city, country } = formData;
      formData.address = `${city}, ${country}`;
      formData.image =
        'https://us.123rf.com/450wm/delwarbd/delwarbd1807/delwarbd180700694/114944844-belle-ic%C3%B4ne-de-publicit%C3%A9-d-emploi-m%C3%A9ticuleusement-con%C3%A7ue.jpg?ver=6';

      formData.languages = (formData.languages || []).map(
        (language: Language) => ({
          id: language.id,
          level: language.level,
        })
      );
      formData.location_type = formData.remote.toLowerCase();
      formData.skills = (formData.skills || []).map((skill: any) => skill.id);
      formData.education = (formData.diplomas || []).map(
        (education: Diploma) => education.id
      );
      formData.experiences = (formData.experiences || []).map(
        (experience: Experience) => experience.id
      );
      try {
        const response = await addJobOffer(formData);
        if (response.status === 200) {
          console.log('JobOffer added');
        }
      } catch (error) {
        console.error('Error adding jobOffer:', error);
      }
    }

    router.back();
  };

  return (
    <ScreenContainer>
      <HeaderContainer title={jobOffer ? 'Edit JobOffer' : 'Add JobOffer'} />
      <ScrollView>
        <JobOfferContainer>
          <DynamicForm
            formStructure={editFormFields}
            label={jobOffer ? 'Edit JobOffer' : 'Add JobOffer'}
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
