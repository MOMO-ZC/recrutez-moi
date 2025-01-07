import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import styled from 'styled-components';
import ButtonText from '../components/ui/ButtonText';
import { useThemeColor } from '../hooks/useThemeColor';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import chroma from 'chroma-js';


const LandingScreen = () => {
    const blurColor = useThemeColor({}, 'blur');
    const mainColor = useThemeColor({}, 'main');
    const textColor = useThemeColor({}, 'text');
    const placeholderColor = useThemeColor({}, 'placeholder');

    const {width, height} = useWindowDimensions();

    const gradientColors = chroma.scale([mainColor, blurColor]).colors(10);

    const wave = useSharedValue(0);


    React.useEffect(() => {
        wave.value = withRepeat(
          withTiming(Math.PI * 2, { duration: 6000 }), 
          -1 // Infinite loop
        );
      }, [wave]);
    
      // Derived values for start and end positions
      const start = useDerivedValue(() => {
        const x = 200+  width / 2 + Math.sin(wave.value) * width / 4; // Wavy motion on X-axis
        const y = -200 + height / 4 + Math.cos(wave.value) * height / 8; // Smaller motion on Y-axis
        return vec(x, y);
      });
    
      const end = useDerivedValue(() => {
        const x = width / 2 + Math.sin(wave.value + Math.PI) * width / 4; // Opposite wave motion
        const y = height * 3 / 4 + Math.cos(wave.value + Math.PI) * height / 8;
        return vec(x, y);
      });

    
  return (
    <>
    <Canvas style={{flex: 1}}>
        <Rect x={0}
        y={0}
        width={width}
        height={height}
        >

        <LinearGradient
        start={start}
        end={end}
        colors={gradientColors}
        />
        </Rect>

        </Canvas>
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
        <ButtonText label="Commencer" onPress={() => console.log(gradientColors)}/>
      </ButtonContainer>
        <FooterTextContainer>
        <FooterText color={placeholderColor}>Déjà un compte ? </FooterText>
        <FooterLink>Se connecter</FooterLink>
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
