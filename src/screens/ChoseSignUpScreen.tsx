import { useRouter } from 'expo-router';
import ButtonText from '../components/ui/ButtonText';
import GradientBackGround from '../components/GradientBackGround';
import styled from 'styled-components';
import { useWindowDimensions, View } from 'react-native';
import { ThemedText } from '../components/ThemedText';

const ChoseSignUpScreen = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  return (
    <>
      <GradientBackGround />
      <ScreenContainer width={width} height={height}>
        <Content>
          <ThemedText type="title">Vous êtes ?</ThemedText>
          <ButtonContainer>
            <Button>
              <ButtonText
                label="une entreprise"
                onPress={() =>
                  router.push({
                    pathname: '/(auth)/register/signup',
                    params: { role: 'company' },
                  })
                }
              />
            </Button>
            <Button>
              <ButtonText
                label="un candidat"
                onPress={() =>
                  router.push({
                    pathname: '/(auth)/register/signup',
                    params: { role: 'candidate' },
                  })
                }
              />
            </Button>
          </ButtonContainer>
        </Content>
      </ScreenContainer>
    </>
  );
};

export default ChoseSignUpScreen;

const ScreenContainer = styled(View)<{ width: number; height: number }>`
  bottom: 0;
  left: 0;
  height: ${(props) => props.height}px;
  margin-left: 16px;
  position: absolute;
  justify-content: center;
  width: ${(props) => props.width - 32}px;
`;

const Content = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled(View)`
  margin-top: 32px;
`;

const ButtonContainer = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: colum;
`;
