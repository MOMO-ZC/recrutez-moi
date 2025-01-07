import React from 'react';
import styled from 'styled-components';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';

const ThemedButton = styled(TouchableOpacity)<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  padding: 16px;
  border-radius: 32px;
  width: 200px;
  height: 64px;
  justify-content: center;
  align-items: center;
`;

interface ButtonProps {
    backgroundColor?: string;
    label: string;
    onPress: () => void;


}

const ButtonText = (
    { backgroundColor,label, onPress }: ButtonProps
) => {
  const bgColor = backgroundColor ??  useThemeColor({}, 'main');

  return (
    <ThemedButton backgroundColor={bgColor} onPress={onPress}>
      <ThemedText type='primary'>{label}</ThemedText>
    </ThemedButton>
  );
};

export default ButtonText;
