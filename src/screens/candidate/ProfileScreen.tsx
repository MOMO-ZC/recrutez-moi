import { useRouter } from 'expo-router';
import HeaderContainer from '../../components/ui/HeaderContainer';
import { useAuth } from '../../hooks/useAuth';
import { Candidate, Experience, MenuOption, Project } from '../../types';
import ScreenContainer from '../common/ScreenContainer';

import { candidates } from '../../mock/candidats';
import Profile from '../../components/Profile/Profile';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useThemeColor } from '../../hooks/useThemeColor';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getCandidate, getProjects } from '@/src/api/candidates';
import { getUser } from '@/src/api/auth';

const ProfileScreen = () => {
  const { logout, id, userId } = useAuth();
  const router = useRouter();
  const iconColor = useThemeColor({}, 'text');

  const [candidate, setCandidate] = useState<Candidate | undefined>();
  const [projects, setProjects] = useState<Project[] | undefined>([]);
  const [experiences, setExperiences] = useState<Experience[] | null>([]);

  useEffect(() => {
    const loadCandidateWithProjects = async (id: string) => {
      try {
        // Fetch projects first
        const projectsData = await getProjects(id);

        // Fetch candidate
        const candidateData = await getCandidate(id);

        // Set both candidate and projects together
        setProjects(projectsData); // Update state for projects (optional)
        setCandidate({ ...candidateData, projects: projectsData }); // Use local projectsData directly
      } catch (error) {
        console.error('Error loading candidate and projects:', error);
      }
    };

    if (id && userId) {
      loadCandidateWithProjects(id);
    }
    console.log('Candidate:', candidate);
  }, [id, userId]); // No need to depend on `projects`

  const menuOptions: MenuOption[] = [
    {
      name: 'edit',
      icon: () => {
        return <Icon name="edit-3" size={14} color={iconColor} />;
      },
      onPress: () => {
        router.push('/(candidate)/profile/edit-profile');
      },
    },
    {
      name: 'logout',
      icon: () => {
        return <Icon name="log-out" size={14} color={iconColor} />;
      },
      onPress: () => {
        logout();
      },
    },
  ];

  return (
    <ScreenContainer>
      <HeaderContainer title="Profile Screen" menu menuOptions={menuOptions} />
      <ScrollView>{candidate && <Profile candidate={candidate} />}</ScrollView>
    </ScreenContainer>
  );
};

export default ProfileScreen;

const Icon = styled(Feather)`
  margin-right: 8px;
`;
