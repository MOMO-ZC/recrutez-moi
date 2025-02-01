import { useRouter } from 'expo-router';
import HeaderContainer from '../../components/ui/HeaderContainer';
import { useAuth } from '../../hooks/useAuth';
import { Candidate, MenuOption } from '../../types';
import ScreenContainer from '../common/ScreenContainer';

import { candidates } from '../../mock/candidats';
import Profile from '../../components/Profile/Profile';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useThemeColor } from '../../hooks/useThemeColor';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getCandidate } from '@/src/api/candidates';
import { getUser } from '@/src/api/auth';

const ProfileScreen = () => {
  const { logout, id, userId } = useAuth();
  const router = useRouter();
  const iconColor = useThemeColor({}, 'text');

  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    const loadUser = async (id: string) => {
      const userData = await getUser(id);
      console.log('userData', userData);
    };
    const loadCandidate = async (id: string, userId: string) => {
      const candidateData = await getCandidate(id);
      console.log(candidateData);
      setCandidate({ ...candidateData, user: loadUser(userId) });
    };
    if (id && userId) {
      loadCandidate(id, userId);
      console.log('candidate', candidate);
    }
  }, [id]);

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
