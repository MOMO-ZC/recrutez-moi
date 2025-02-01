import { Candidate, Skill } from '@/src/types';
import { Image, View } from 'react-native';
import styled from 'styled-components';
import { ThemedText } from '../ThemedText';
import FormationDisplayer from './FormationDisplayer';
import { useEffect } from 'react';
import SkillDisplayer from '../ui/SkillDisplayer';
import ProjectDisplayer from './ProjectDisplayer';
import { getUniqueSkills } from '@/src/utils/getSkills';
import { Feather } from '@expo/vector-icons';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import RoundedButton from '../ui/RoundedButton';
import { router, useRouter } from 'expo-router';
import LanguageDisplayer from '../ui/LanguageDisplayer';
import ExperienceDisplayer from './ExperienceDisplayer';

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
    experiences,
    socialMedias,
    user,
  } = candidate;
  const { email } = user ?? '';
  let skills: Skill[] = [];
  skills = getUniqueSkills(formations ?? [], projects ?? []);
  skills.sort((a, b) => a.category.localeCompare(b.category));

  const iconColor = useThemeColor({}, 'text');

  const router = useRouter();

  return (
    <ProfileContainer>
      <AvatarContainer>
        {avatar ? (
          <Avatar source={avatar} />
        ) : (
          <Avatar source={require('../../assets/images/defaultuser.png')} />
        )}
      </AvatarContainer>
      <InfoContainer>
        <TitleContainer>
          <ThemedText type="title">
            {firstName} {lastName}
          </ThemedText>
          <RoundedButton
            size={32}
            color={'transparent'}
            icon={<Icon name="edit-3" size={20} color={iconColor} />}
            onPress={() => router.push('/(candidate)/profile/edit-profile')}
          />
        </TitleContainer>
        <ThemedText type="default">{location}</ThemedText>
      </InfoContainer>

      <SectionContainer>
        <TitleContainer>
          <ThemedText type="subtitle">Formations</ThemedText>
        </TitleContainer>
        {formations && <FormationDisplayer formations={formations} />}
      </SectionContainer>

      <SectionContainer>
        <TitleContainer>
          <ThemedText type="subtitle">Experiences</ThemedText>
        </TitleContainer>
        {experiences && <ExperienceDisplayer experiences={experiences} />}
      </SectionContainer>

      <SectionContainer>
        <TitleContainer>
          <ThemedText type="subtitle">Projects</ThemedText>
        </TitleContainer>
        {projects && <ProjectDisplayer projects={projects} />}
      </SectionContainer>
      <SkillsContainer>
        <ThemedText type="subtitle">Skills</ThemedText>
        <SkillDisplayer skills={skills} />
      </SkillsContainer>
      <ContactContainer>
        <TitleContainer>
          <ThemedText type="subtitle">About me</ThemedText>
          <RoundedButton
            size={28}
            color={'transparent'}
            icon={<Icon name="edit-3" size={16} color={iconColor} />}
            onPress={() => router.push('/(candidate)/profile/edit-profile')}
          />
        </TitleContainer>
        <ThemedText type="default">{bio}</ThemedText>

        <ContactItem>
          <ContactIcon name="gift" size={16} color={iconColor} />
          <ThemedText type="default">{birthDate}</ThemedText>
        </ContactItem>
        <ContactItem>
          <ContactIcon name="globe" size={16} color={iconColor} />
          {languages && <LanguageDisplayer languages={languages} />}
        </ContactItem>
        {interests && (
          <ContactItem>
            <ContactIcon name="heart" size={16} color={iconColor} />
            <ThemedText type="default">{interests.join(', ')}</ThemedText>
          </ContactItem>
        )}
        <ContactItem>
          <ContactIcon name="mail" size={16} color={iconColor} />
          <ThemedText type="default">{email}</ThemedText>
        </ContactItem>
      </ContactContainer>
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

const Icon = styled(Feather)``;

const InfoContainer = styled(View)`
  align-items: center;
`;

const ProfileContainer = styled(View)``;

const SectionContainer = styled(View)`
  margin-top: 12px;
  margin-left: 12px;
  margin-right: 12px;
`;

const TitleContainer = styled(View)`
  margin-top: 16px;
  flex-direction: row;
`;

const SkillsContainer = styled(View)`
  margin-top: 12px;
  margin-left: 12px;
  margin-right: 12px;
`;
