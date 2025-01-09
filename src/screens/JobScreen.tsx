import { BackHandler, View } from "react-native";
import styled from "styled-components";
import { useThemeColor } from "../hooks/useThemeColor";
import { ThemedText } from "../components/ThemedText";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import LikeSlider from "../components/Slider/LikeSlider";
import { useEffect } from "react";
import NavBar from "../components/ui/NavBar";
import { ScreenContainer } from "./common/components";



const JobScreen = () => {
    const favColor = useThemeColor({}, 'main');
    const dislikeColor = useThemeColor({}, 'danger');
    const likeColor = useThemeColor({}, 'success');
    const propositions = ['test1', 'test2', 'test3']

    return (
        <ScreenContainer>
            <GestureHandlerRootView>
            <LikeSlider propositions={propositions} />
            </GestureHandlerRootView>
            <NavBar/>

        </ScreenContainer>
    )
};


const Title = styled(ThemedText)`
    `;

const Content = styled(View)`
    flex: 0.7;
    width: 100%;
    height: 20%;
    align-items: center;
    background-color: yellow;
    justify-content: flex-end;
`;

const ButtonContainer = styled(View)`
    flex: 0.20;
    padding-left: 64px;
    padding-right: 64px;
    justify-content: space-between;
    flex-direction: row;
    background-color: pink;
`;



export default JobScreen;

