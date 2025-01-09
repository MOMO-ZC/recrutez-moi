import { Header } from '@/src/screens/common/components';
import { ThemedText } from '../ThemedText';
import RoundedButton from './RoundedButton';
import { Feather } from '@expo/vector-icons';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import styled from 'styled-components';
import { View } from 'react-native';
import { useNavigation } from 'expo-router';
import { BlurView } from 'expo-blur';

interface HeaderContainerProps {
  title: string;
}

const HeaderContainer = (props: HeaderContainerProps) => {
  const { title } = props;
  const iconColor = useThemeColor({}, 'black');
  const buttonColor = useThemeColor({}, 'blur');
  const navigation = useNavigation();

  return (
    <HeaderContainerView>
      <BackButtonContainer>
        <RoundedButton
          onPress={() => {
            navigation.goBack();
          }}
          color={buttonColor}
          size={40}
          icon={<Feather name="arrow-left" size={12} color={iconColor} />}
        />
      </BackButtonContainer>
      <TitleContainer>
        <ThemedText type="title">{title}</ThemedText>
      </TitleContainer>
      <MenuButtonContainer>
        <RoundedButton
          onPress={() => {}}
          color={buttonColor}
          size={40}
          icon={<Feather name="more-horizontal" size={12} color={iconColor} />}
        />
      </MenuButtonContainer>
    </HeaderContainerView>
  );
};

export default HeaderContainer;

const HeaderContainerView = styled(View)`
  margin-top: 64px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BackButtonContainer = styled(View)`
  position: absolute;
  left: 32px;
`;
const MenuButtonContainer = styled(View)`
  position: absolute;
  right: 32px;
`;

const TitleContainer = styled(View)`
  flex: 1;
  align-items: center;
`;
