import { ScrollView } from 'react-native-gesture-handler';
import HeaderContainer from '../../components/ui/HeaderContainer';
import ScreenContainer from '../common/ScreenContainer';

const LikedScreen = () => {
  return (
    <ScreenContainer>
      <HeaderContainer title="Liked Screen" />
      <ScrollView></ScrollView>
    </ScreenContainer>
  );
};

export default LikedScreen;
