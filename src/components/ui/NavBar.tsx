import { Touchable, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';
import Feather from '@expo/vector-icons/Feather';
import { usePathname, useRouter } from 'expo-router';
import { useThemeColor } from '@/src/hooks/useThemeColor';

const NavBar = () => {
  const fill = useThemeColor({}, 'black');
  const stroke = useThemeColor({}, 'placeholder');
  const navColor = useThemeColor({}, 'mainUi');

  const router = useRouter();

  const pathname = usePathname();

  return (
    <Footer>
      <NavBarContainer color={navColor}>
        <IconButton onPress={() => router.replace('/(tabs)')}>
          <Feather
            name="target"
            size={24}
            color={pathname === '/' ? fill : stroke}
          />
        </IconButton>
        <IconButton onPress={() => router.replace('/(tabs)/liked')}>
          <Feather
            name="heart"
            size={24}
            color={pathname === '/liked' ? fill : stroke}
          />
        </IconButton>

        <IconButton onPress={() => router.replace('/(tabs)/projects')}>
          <Feather
            name="dribbble"
            size={24}
            color={pathname === '/projects' ? fill : stroke}
          />
        </IconButton>

        <IconButton onPress={() => router.replace('/(tabs)/profile')}>
          <Feather
            name="user"
            size={24}
            color={pathname === '/profile' ? fill : stroke}
          />
        </IconButton>
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
const NavBarContainer = styled(View)<{ color: string }>`
  flex: 1;
  flex-direction: row;
  border-radius: 36px;
  justify-content: space-around;
  width: 90%;
  padding: 16px;
  background-color: ${(props) => props.color};
  backdrop-filter: blur(20px);
`;

const IconButton = styled(TouchableOpacity)`
  padding: 12px;
`;

export default NavBar;
