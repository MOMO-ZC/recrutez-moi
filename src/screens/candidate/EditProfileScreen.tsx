import { ScrollView } from 'react-native-gesture-handler';
import ScreenContainer from '../common/ScreenContainer';
import HeaderContainer from '../../components/ui/HeaderContainer';
import EditProfile from '../../components/Profile/EditProfile';
import { candidates } from '../../mock/candidats';
import { useEffect } from 'react';
import { useLanguage } from '@/src/hooks/useLanguage';

export const EditProfileScreen = () => {

  return (
    <ScreenContainer>
      <HeaderContainer title="Edit Profile" />
      <ScrollView>
        <EditProfile candidate={candidates[0]} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default EditProfileScreen;
