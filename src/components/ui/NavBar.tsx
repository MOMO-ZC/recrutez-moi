import { Touchable, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Feather from '@expo/vector-icons/Feather';
import { usePathname, useRouter } from 'expo-router';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import Logo from './Logo';
import { useAuth } from '@/src/hooks/useAuth';

const NavBar = () => {
  const fill = useThemeColor({}, 'black');
  const stroke = useThemeColor({}, 'white');
  const navColor = useThemeColor({}, 'ui-buttons');
  const borderColor = useThemeColor({}, 'ui-items');

  const { role } = useAuth();

  const router = useRouter();

  const pathname = usePathname();

  return role === 'candidate' ? (
    <Footer>
      <NavBarContainer color={navColor} border={borderColor}>
        <IconButton onPress={() => router.replace('/(candidate)')}>
          <Logo size={28} fill={pathname === '/' ? fill : stroke} />
        </IconButton>
        <IconButton onPress={() => router.replace('/(candidate)/liked')}>
          <Feather
            name="heart"
            size={24}
            color={pathname === '/liked' ? fill : stroke}
          />
        </IconButton>

        <IconButton onPress={() => router.replace('/(candidate)/projects')}>
          <Feather
            name="dribbble"
            size={24}
            color={pathname === '/projects' ? fill : stroke}
          />
        </IconButton>

        <IconButton onPress={() => router.replace('/(candidate)/profile')}>
          <Feather
            name="user"
            size={24}
            color={pathname === '/profile' ? fill : stroke}
          />
        </IconButton>
      </NavBarContainer>
    </Footer>
  ) : (
    <Footer>
      <NavBarContainer color={navColor} border={borderColor}>
        <IconButton onPress={() => router.replace('/(company)/(jobOffer)')}>
          <Logo size={28} fill={pathname === '/' ? fill : stroke} />
        </IconButton>
        {/* <IconButton onPress={() => router.replace('/(candidate)/liked')}>
          <Feather
            name="heart"
            size={24}
            color={pathname === '/liked' ? fill : stroke}
          />
        </IconButton>

        <IconButton onPress={() => router.replace('/(candidate)/projects')}>
          <Feather
            name="dribbble"
            size={24}
            color={pathname === '/projects' ? fill : stroke}
          />
        </IconButton>

        <IconButton onPress={() => router.replace('/(candidate)/profile')}>
          <Feather
            name="user"
            size={24}
            color={pathname === '/profile' ? fill : stroke}
          />
        </IconButton> */}
      </NavBarContainer>
    </Footer>
  );
};

const Footer = styled(View)`
  position: absolute;
  bottom: 0;
  align-self: center;
  align-items: center;
  margin-bottom: 24px;
`;
const NavBarContainer = styled(View)<{ color: string; border: string }>`
  flex: 1;
  flex-direction: row;
  border-radius: 36px;
  justify-content: space-around;
  width: 90%;
  padding: 16px;
  background-color: ${(props) => props.color};
  backdrop-filter: blur(20px);
  border: 1px solid ${(props) => props.border};
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.23;
  shadow-radius: 4;
  elevation: 4;
`;

const IconButton = styled(TouchableOpacity)`
  padding: 12px;
`;

export default NavBar;
