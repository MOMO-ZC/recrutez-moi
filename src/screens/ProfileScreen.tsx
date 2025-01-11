import { useRouter } from 'expo-router';
import HeaderContainer from '../components/ui/HeaderContainer';
import { useAuth } from '../hooks/useAuth';
import { MenuOption } from '../types';
import ScreenContainer from './common/ScreenContainer';

import { candidates } from '../mock/candidats';
import Profile from '../components/Profile/Profile';
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler';

const ProfileScreen = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const menuOptions: MenuOption[] = [
    {
      name: 'edit',
      onPress: () => {
        console.log('edit');
      },
    },
    {
      name: 'logout',
      onPress: () => {
        logout();
        console.log('logout');
        router.push('/(auth)');
      },
    },
  ];

  return (
    <ScreenContainer>
      <ScrollView>
        <HeaderContainer
          title="Profile Screen"
          menu
          menuOptions={menuOptions}
        />
        <Profile candidate={candidates[0]} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default ProfileScreen;
