import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, useWindowDimensions } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import styled from 'styled-components';

import ButtonText from '../components/ui/ButtonText';
import { useThemeColor } from '../hooks/useThemeColor';
import { useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import chroma from 'chroma-js';
import GradientBackGround from '../components/GradientBackGround';
import { useAuth } from '../hooks/useAuth';


const LandingScreen = () => {
  const router = useRouter();
    const mainColor = useThemeColor({}, 'main');
    const textColor = useThemeColor({}, 'text');
    const placeholderColor = useThemeColor({}, 'placeholder');

    const {width, height} = useWindowDimensions();

    const {login,isAuthenticated} = useAuth();

    const handleStart = () => {
         login();
      };

      useEffect(() => {
        if (isAuthenticated) {
          router.replace("/(tabs)");
        }
      }, [isAuthenticated]);
    
  return (
    <>
    <GradientBackGround/>
    <Container width={width}>

    <Content>
      <Title color={textColor}>
        <Highlight color={mainColor}>Postulez</Highlight>{' '} 
        à des offres d'emploi qui{' '} 
        <Highlight color={mainColor}>vous</Highlight> correspondent.
      </Title>
      </Content>
      <Footer>
      <ButtonContainer>
        <ButtonText label="Commencer" onPress={handleStart}/>
      </ButtonContainer>
        <FooterTextContainer>
        <FooterText color={placeholderColor}>Déjà un compte ? </FooterText>
        <FooterLink
          onPress={() => router.replace('/(auth)/login')}
        >Se connecter</FooterLink>
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


const FooterText = styled(Text)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 14px;
`;

const FooterLink = styled(Text)`
  color: red;
  font-size: 14px;
  font-weight: bold;
`;

const ButtonContainer = styled(View)`
`;

export default LandingScreen;
