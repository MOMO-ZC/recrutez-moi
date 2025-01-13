import { Candidate, Skill } from '@/src/types';
import { Image, View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import FormationDisplayer from './FormationDisplayer';
import { useEffect } from 'react';
import SkillDisplayer from './SkillDisplayer';
import ProjectDisplayer from './ProjectDisplayer';
import { getUniqueSkills } from '@/src/utils/getSkills';
import { Feather } from '@expo/vector-icons';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import DynamicForm, { FormField } from '../ui/DynamicForm';
import { useRouter } from 'expo-router';

interface ProfileProps {
  candidate: Candidate;
}

const EditProfile = (props: ProfileProps) => {
  const { candidate } = props;

  const {
    avatar,
    bio,
    birthDate,
    firstName,
    formations,
    languages,
    lastName,
    location,
    interests,
    projects,
    socialMedias,
    user,
  } = candidate;
  const { email } = user;
  let skills: Skill[] = [];
  if (formations && projects) {
    skills = getUniqueSkills(formations, projects);
    skills.sort((a, b) => a.category.localeCompare(b.category));
  }

  const iconColor = useThemeColor({}, 'text');

  const editFormFields: FormField[] = [
    {
      name: 'firstName',
      label: 'Adresse email',
      placeholder: firstName,
      type: 'text',
    },
    { name: 'lastName', label: 'Nom', placeholder: lastName, type: 'text' },
    {
      name: 'birthDate',
      label: 'Date de naissance',
      placeholder: birthDate,
      type: 'text',
    },
    { name: 'location', label: 'Adresse', placeholder: location, type: 'text' },
    { name: 'email', label: 'Adresse email', placeholder: email, type: 'text' },
    { name: 'bio', label: 'Biographie', placeholder: bio, type: 'longText' },
  ];

  const router = useRouter();

  const handleEdit = () => {
    console.log('edit');
    router.push('/(tabs)/profile');
  };

  return (
    <ProfileContainer>
      <AvatarContainer>
        {avatar ? (
          <Avatar source={avatar} />
        ) : (
          <Avatar source={require('../../assets/images/defaultuser.png')} />
        )}
        <ModifierIconContainer>
          <Feather name="edit-3" size={24} color={iconColor} />
        </ModifierIconContainer>
      </AvatarContainer>

      <TitleContainer>
        <ThemedText type="title">
          {firstName} {lastName}
        </ThemedText>
        <ThemedText type="default">{location}</ThemedText>
        <FormContainer>
          <DynamicForm
            formStructure={editFormFields}
            label="Modifier"
            onSubmit={handleEdit}
          />
        </FormContainer>
      </TitleContainer>
    </ProfileContainer>
  );
};

export default EditProfile;

const Avatar = styled(Image)`
  margin-top: 16px;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  align-self: center;
`;

const AvatarContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

const AvatarModifier = styled(View)`
  margin-top: 16px;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  align-self: center;
`;

const ContactContainer = styled(View)`
  margin-top: 12px;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 128px;
`;

const ContactIcon = styled(Feather)`
  margin-right: 8px;
`;

const ContactItem = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const FormationContainer = styled(View)`
    margin-left: 12px
    margin-right: 32px
    margin-top: 12px;
`;

const FormContainer = styled(View)`
  margin-top: 16px;
  margin-bottom: 128px;
`;

const ModifierIconContainer = styled(View)`
  position: absolute;
  bottom: 0;
  right: 25%;
`;

const ProfileContainer = styled(View)``;

const ProjectContainer = styled(View)`
  margin-top: 12px;
  margin-left: 12px;
  margin-right: 12px;
`;

const TitleContainer = styled(View)`
  align-items: center;
  margin-top: 16px;
`;

const SkillsContainer = styled(View)`
  margin-top: 12px;
  margin-left: 12px;
  margin-right: 12px;
`;
