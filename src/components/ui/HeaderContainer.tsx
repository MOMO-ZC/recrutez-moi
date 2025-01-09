import { Header } from "@/src/screens/common/components";
import { ThemedText } from "../ThemedText";
import RoundedButton from "./RoundedButton";
import { Feather } from "@expo/vector-icons";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import styled from "styled-components";
import { View } from "react-native";
import { useNavigation } from "expo-router";
import { BlurView } from "expo-blur";

interface HeaderContainerProps {
  title: string;
}

const HeaderContainer = (props: HeaderContainerProps) => {
  const { title } = props;
  const iconColor = useThemeColor({}, "black");
  const buttonColor = useThemeColor({}, "blur");
  const navigation = useNavigation();

  return (
    <HeaderContainerView>
      <ButtonContainer>
        <RoundedButton
          onPress={() => {navigation.goBack()}}
          color={buttonColor}
          size={40}
          icon={<Feather name="arrow-left" size={12} color={iconColor} />}
        />
      </ButtonContainer>
      <TitleContainer>
        <ThemedText type="title">{title}</ThemedText>
      </TitleContainer>
    </HeaderContainerView>
  );
};

export default HeaderContainer;


const HeaderContainerView = styled(View)`
  margin-top: 64px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between
`;

const ButtonContainer = styled(View)`
  position: absolute;
  margin-left: 32px;
`;

const BlurButtonContainer = styled(BlurView)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Ensures the blur effect stays within the rounded edges */
`;

const TitleContainer = styled(View)`
  flex: 1;
  align-items: center;
`;
