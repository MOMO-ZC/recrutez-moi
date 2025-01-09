import { View } from "react-native";
import styled from "styled-components";
import { useThemeColor } from "../hooks/useThemeColor";
import { ThemedText } from "../components/ThemedText";
import RoundedButton from "../components/ui/RoundedButton";

import FavoriteIcon from "@/src/assets/svg/FavoriteIcon.svg"; 
import CloseRoundIcon from '@/src/assets/svg/CloseRoundIcon.svg';
import Swipper from "../components/Swipper";



const JobScreen = () => {
    const favColor = useThemeColor({}, 'main');
    const dislikeColor = useThemeColor({}, 'danger');
    const propositions = ['test1', 'test2', 'test3']
    return (
        <ScreenContainer>
            <Header>
                <Title type='primary'>Offres d'emploi</Title>
            </Header>
            <Content>
                <Swipper
                    cards={propositions}
                />
            </Content>
            <ButtonContainer>
                <RoundedButton 
                    color={dislikeColor} 
                    Icon={CloseRoundIcon}
                    iconHeight={50}
                    iconWidth={50}
                    onPress={() => console.log('Dislike')} />
                <RoundedButton 
                    color={favColor} 
                    Icon={FavoriteIcon}
                    iconHeight={32}
                    iconWidth={32}
                    onPress={() => console.log('Like')} />
            </ButtonContainer>
        </ScreenContainer>
    )
};

const ScreenContainer = styled(View)`
  flex: 1
`;

const Header = styled(View)`
    flex: 0.25
    justify-content: center;
    align-items: center;
`;

const Title = styled(ThemedText)`
    `;

const Content = styled(View)`
    flex: 0.7;
    height: 20%;
    align-items: center;
`;

const ButtonContainer = styled(View)`
    flex: 0.20;
    padding-left: 64px;
    padding-right: 64px;
    justify-content: space-between;
    flex-direction: row;
`;


export default JobScreen;

