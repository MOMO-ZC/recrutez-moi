import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, useWindowDimensions } from 'react-native';
import styled from 'styled-components';

import ButtonText from '../components/ui/ButtonText';
import { useThemeColor } from '../hooks/useThemeColor';
import GradientBackGround from '../components/GradientBackGround';
import { useAuth } from '../hooks/useAuth';
import { ThemedText } from '../components/ThemedText';
import Logo from '../components/ui/Logo';

const LandingScreen = () => {
  const router = useRouter();
  const mainColor = useThemeColor({}, 'main');
  const textColor = useThemeColor({}, 'text');

  const { width } = useWindowDimensions();

  const { authToken } = useAuth();

  const handleStart = () => {
    router.push('/(auth)/chose-register');
  };

  useEffect(() => {
    if (authToken) {
      router.replace('/(candidate)');
    }
  }, [authToken]);

  return (
    <>
      <GradientBackGround />
      <Container width={width}>
        <Content>
          <Logo size={128} />
          <Title color={textColor}>
            Des offres d'emploi qui{' '}
            <Highlight color={mainColor}>vous</Highlight> correspondent.
          </Title>
        </Content>
        <Footer>
          <ButtonContainer>
            <ButtonText label="Commencer" onPress={handleStart} />
          </ButtonContainer>
          <FooterTextContainer>
            <FooterText>Déjà un compte ? </FooterText>
            <FooterLink
              type="link"
              onPress={() => router.replace('/(auth)/login')}
            >
              Se connecter
            </FooterLink>
          </FooterTextContainer>
        </Footer>
      </Container>
    </>
  );
};

const Container = styled(View)<{ width: number }>`
  position: absolute;
  bottom: 0;
  left: 16;
  width: ${(props) => props.width - 32}px;
  align-items: center;
  flex-direction: column;
  flex-start: revert;
`;

const Content = styled(View)`
flex: 1
bottom: 200;
position: absolute;
align-items: center;
`;

const Title = styled(Text)<{ color: string }>`
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => props.color};
  text-align: center;
  margin-bottom: 48px;
`;

const Highlight = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
`;

const Footer = styled(View)`
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-top: 128px;
`;
const FooterTextContainer = styled(View)`
  margin-top: 64px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`;

const FooterText = styled(ThemedText)`
  font-size: 14px;
`;

const FooterLink = styled(ThemedText)`
  font-size: 16px;
  font-weight: bold;
`;

const ButtonContainer = styled(View)``;

export default LandingScreen;
