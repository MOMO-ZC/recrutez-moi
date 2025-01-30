import { useRouter } from 'expo-router';
import HeaderContainer from '../../components/ui/HeaderContainer';
import { useAuth } from '../../hooks/useAuth';
import { MenuOption } from '../../types';
import ScreenContainer from '../common/ScreenContainer';

import { candidates } from '../../mock/candidats';
import Profile from '../../components/Profile/Profile';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useThemeColor } from '../../hooks/useThemeColor';
import styled from 'styled-components';

const ProfileScreen = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const iconColor = useThemeColor({}, 'text');
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
        router.push('/(auth)');
      },
    },
  ];

  return (
    <ScreenContainer>
      <HeaderContainer title="Profile Screen" menu menuOptions={menuOptions} />
      <ScrollView>
        <Profile candidate={candidates[0]} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default ProfileScreen;

const Icon = styled(Feather)`
  margin-right: 8px;
`;
