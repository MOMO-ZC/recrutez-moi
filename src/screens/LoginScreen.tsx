import React from 'react';
import { DynamicForm, FormField } from '@/src/components/ui/DynamicForm';
import styled, { useTheme } from 'styled-components';
import {
  Alert,
  View,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import GradientBackGround from '../components/GradientBackGround';
import { useThemeColor } from '../hooks/useThemeColor';
import HeaderContainer from '../components/ui/HeaderContainer';
import { ThemedText } from '../components/ThemedText';

const formStructure: FormField[] = [
  { name: 'email', label: 'Adresse email', type: 'text' },
  { name: 'password', label: 'Mot de passe', type: 'password' },
];

const LoginScreen: React.FC = () => {
  const { width, height } = useWindowDimensions();

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
      <GradientBackGround />
      <ScreenContainer width={width} height={height}>
        <Content>
          <DynamicForm
            formStructure={formStructure}
            label="Se connecter"
            onSubmit={handleLogin}
          />
        </Content>
        <Footer>
          <FooterText>Pas encore de compte ?</FooterText>
          <FooterLink
            type="link"
            onPress={() => Alert.alert('Sign Up', 'Redirect to sign-up')}
          >
            S'inscrire
          </FooterLink>
        </Footer>
      </ScreenContainer>
    </>
  );
};

const ScreenContainer = styled(View)<{ width: number; height: number }>`
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

const FooterText = styled(ThemedText)``;

const FooterLink = styled(ThemedText)`
  font-size: 16px;
  font-weight: bold;
  margin-left: 4px;
`;

export default LoginScreen;
