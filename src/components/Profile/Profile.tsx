import { Candidate, Skill } from '@/src/types';
import { Image, View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import FormationDisplayer from './FormationDisplayer';
import { useEffect } from 'react';
import SkillDisplayer from './SkillDisplayer';
import ProjectDisplayer from './ProjectDisplayer';
import { getUniqueSkills } from '@/src/utils/getSkills';

interface ProfileProps {
  candidate: Candidate;
}

const Profile = (props: ProfileProps) => {
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

  useEffect(() => {
    console.log(formations);
    return () => {
      console.log('Profile unmounted');
    };
  }, []);

  return (
    <ProfileContainer>
      <AvatarContainer>
        {avatar ? (
          <Avatar source={avatar} />
        ) : (
          <Avatar source={require('../../assets/images/defaultuser.png')} />
        )}
      </AvatarContainer>
      <TitleContainer>
        <ThemedText type="title">
          {firstName} {lastName}
        </ThemedText>
        <ThemedText type="default">{location}</ThemedText>
      </TitleContainer>
      <FormationContainer>
        <ThemedText type="subtitle">Formations</ThemedText>
        {formations && <FormationDisplayer formations={formations} />}
      </FormationContainer>

      <ProjectContainer>
        <ThemedText type="subtitle">Projects</ThemedText>
        {projects && <ProjectDisplayer projects={projects} />}
      </ProjectContainer>
      <SkillsContainer>
        <ThemedText type="subtitle">Skills</ThemedText>
        <SkillDisplayer skills={skills} />
      </SkillsContainer>
    </ProfileContainer>
  );
};

export default Profile;

const Avatar = styled(Image)`
  margin-top: 16px;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  align-self: center;
`;

const AvatarContainer = styled(View)``;

const FormationContainer = styled(View)`
    margin-left: 12px
    margin-right: 12px
    margin-top: 12px;
`;

const ProfileContainer = styled(View)``;

const ProjectContainer = styled(View)`
  margin-top: 12px;
  margin-left: 12px;
  margin-right: 12px;
`;

const TitleContainer = styled(View)`
  align-items: center;
`;

const SkillsContainer = styled(View)`
  margin-top: 12px;
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 128px;
`;
