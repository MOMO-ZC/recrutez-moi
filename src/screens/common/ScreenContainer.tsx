import { useHeader } from '@/src/hooks/useHeader';
import { ReactNode } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';

const ScreenContainer = ({ children }: { children: ReactNode }) => {
  const { menuVisible, toggleMenu } = useHeader();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (menuVisible) toggleMenu();
      }}
    >
      <Container>{children}</Container>
    </TouchableWithoutFeedback>
  );
};

export default ScreenContainer;

const Container = styled(View)`
  flex: 1;
`;
