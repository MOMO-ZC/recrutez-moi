import React from 'react';
import { DynamicForm, FormField } from '@/src/components/ui/DynamicForm';
import styled, { useTheme } from 'styled-components';
import { Alert, View, Text, useWindowDimensions, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import GradientBackGround from '../components/GradientBackGround';
import { useThemeColor } from '../hooks/useThemeColor';

const formStructure: FormField[] = [
  { name: 'email', label: 'Adresse email', type: 'text' },
  { name: 'password', label: 'Mot de passe', type: 'password' },
];

const LoginScreen: React.FC = () => {

   const textColor = useThemeColor({}, 'text');

   const {width, height} = useWindowDimensions();


  const handleLogin = (formData: { [key: string]: any }) => {
    const { email, password } = formData;
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    console.log('Logging in with:', formData);
    Alert.alert('Success', `Logged in as ${email}`);
  };

  return (
    <>
    <GradientBackGround/>
    <ScreenContainer width={width} height={height}>
      <Header>
        {/* <Title>Welcome Back!</Title>
        <Subtitle>Login to your account</Subtitle> */}
      </Header>
        <Content>

      <DynamicForm
        formStructure={formStructure}
        label="Se connecter"
        onSubmit={handleLogin}
      />
        </Content>
      <Footer>
        <FooterText color={textColor}>Pas encore de compte ?</FooterText>
        <FooterLink onPress={() => Alert.alert('Sign Up', 'Redirect to sign-up')}>
          S'inscrire
        </FooterLink>
      </Footer>
    </ScreenContainer>
    
    </>
  );
};

const ScreenContainer = styled(View)<{ width: number, height: number }>`
  bottom: 0;
  left: 0;
  height: ${(props) => props.height}px;
  margin-left: 16px;
  position: absolute;
  justify-content: center;
  width: ${(props) => props.width - 32}px;
`;

const Header = styled(View)`
  margin-bottom: 32px;
  align-items: center;
`;

const Content = styled(View)`
    margin-top: 228px;
    flex: 1;
    justify-content: center;
    `;

const Title = styled(Text)`
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

const Subtitle = styled(Text)`
  font-size: 16px;
  color: #555;
`;

const Footer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

const FooterText = styled(Text)<{ color: string }>`
  font-size: 14px;
    color: ${(props) => props.color};
`;

const FooterLink = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  color: red;
  margin-left: 4px;
`;

export default LoginScreen;
