import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Text,
  TouchableWithoutFeedback,
  VirtualizedList,
} from 'react-native';
import styled from 'styled-components';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useHeader } from '@/src/hooks/useHeader';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { MenuOption } from '@/src/types';
import RoundedButton from './RoundedButton';
import { ThemedText } from '../ThemedText';

interface HeaderContainerProps {
  title: string;
  menu?: boolean;
  menuOptions?: MenuOption[];
}

const HeaderContainer = ({
  title,
  menu,
  menuOptions = [],
}: HeaderContainerProps) => {
  const { menuVisible, toggleMenu, animationValue } = useHeader();
  const iconColor = useThemeColor({}, 'text');
  const buttonColor = useThemeColor({}, 'mainUi');
  const router = useRouter();

  const menuStyle = {
    opacity: animationValue,
    transform: [
      { scale: animationValue },
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (menuVisible) toggleMenu();
      }}
    >
      <HeaderContainerView>
        <BackButtonContainer>
          <RoundedButton
            onPress={() => {
              if (menuVisible) toggleMenu();
              router.back();
            }}
            color={buttonColor}
            size={40}
            icon={<Feather name="arrow-left" size={12} color={iconColor} />}
          />
        </BackButtonContainer>
        <TitleContainer>
          <ThemedText type="title">{title}</ThemedText>
        </TitleContainer>
        {menu && (
          <MenuButtonContainer>
            <RoundedButton
              onPress={() => {
                toggleMenu();
              }}
              color={buttonColor}
              size={40}
              icon={
                <Feather name="more-horizontal" size={12} color={iconColor} />
              }
            />
            {menuVisible && (
              <MenuModal style={menuStyle} color={buttonColor}>
                {menuOptions.map((option) => (
                  <MenuItem key={option.name} onPress={option.onPress}>
                    {option.icon && option.icon()}
                    <MenuItemText>{option.name}</MenuItemText>
                  </MenuItem>
                ))}
              </MenuModal>
            )}
          </MenuButtonContainer>
        )}
      </HeaderContainerView>
    </TouchableWithoutFeedback>
  );
};

export default HeaderContainer;

const HeaderContainerView = styled(View)`
  margin-top: 96px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
`;

const BackButtonContainer = styled(View)`
  position: absolute;
  left: 32px;
  margin-bottom: 4px;
`;

const MenuButtonContainer = styled(View)`
  position: absolute;
  right: 32px;
`;

const TitleContainer = styled(View)`
  flex: 1;
  align-items: center;
`;

const MenuModal = styled(Animated.View)<{ color: string }>`
  position: absolute;
  top: 50px;
  right: 0px;
  background-color: ${(props) => props.color};
  border-radius: 8px;
  padding: 8px;
  flex-grow: 0;
  min-width: 90px;
`;

const MenuItem = styled(TouchableOpacity)`
  width: auto;
  padding: 4px;
  flex-direction: row;
  align-items: center;
`;

const MenuItemText = styled(ThemedText)`
  font-size: 16px;
`;
