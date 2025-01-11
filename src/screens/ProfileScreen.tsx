import { useRouter } from 'expo-router';
import HeaderContainer from '../components/ui/HeaderContainer';
import { useAuth } from '../hooks/useAuth';
import { MenuOption } from '../types';
import ScreenContainer from './common/ScreenContainer';

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
      <HeaderContainer title="Profile Screen" menu menuOptions={menuOptions} />
    </ScreenContainer>
  );
};

export default ProfileScreen;
