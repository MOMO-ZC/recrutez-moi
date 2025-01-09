import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import Svg, { SvgProps } from 'react-native-svg';



interface RoundedButtonProps {
    color: string;
    icon: React.ReactNode;
    onPress: () => void;
    size?: number;
  }

const ThemedButton = styled(TouchableOpacity)<{ backgroundColor: string, size?: number }>`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 64px;
  width: ${(props) => props.size ?? 72}px;
  height: ${(props) => props.size ?? 72}px;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled(View)`
    justify-content: center;
    align-items: center;
`;

const RoundedButton = (props: RoundedButtonProps) => {
 const { color, icon, onPress, size } = props;
  return (
    <ThemedButton backgroundColor={color} onPress={onPress} size={size}>
        <IconWrapper>
          {icon}
        </IconWrapper>
    </ThemedButton>
  );
}

export default RoundedButton;