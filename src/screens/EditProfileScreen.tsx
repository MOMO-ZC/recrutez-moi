import { ScrollView } from 'react-native-gesture-handler';
import ScreenContainer from './common/ScreenContainer';
import HeaderContainer from '../components/ui/HeaderContainer';
import EditProfile from '../components/Profile/EditProfile';
import { candidates } from '../mock/candidats';

export const EditProfileScreen = () => {
  return (
    <ScreenContainer>
      <ScrollView>
        <HeaderContainer title="Edit Profile" />
        <EditProfile candidate={candidates[0]} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default EditProfileScreen;
