import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import Svg, { SvgProps } from 'react-native-svg';



interface RoundedButtonProps {
    color: string;
    Icon?: React.FC<SvgProps>;
    iconWidth?: number;
    iconHeight?: number;
    onPress: () => void;
  }

const ThemedButton = styled(TouchableOpacity)<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 64px;
  width: 72px;
  height: 72px;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled(View)`
    justify-content: center;
    align-items: center;
`;

const RoundedButton = (props: RoundedButtonProps) => {
 const { color, Icon, iconWidth, iconHeight, onPress } = props;
  return (
    <ThemedButton backgroundColor={color} onPress={onPress}>
        <IconWrapper>
        {Icon && <Icon width={iconWidth} height={iconHeight} fill="white" />}
        </IconWrapper>
    </ThemedButton>
  );
}

export default RoundedButton;