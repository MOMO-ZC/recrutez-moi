import { View } from "react-native";
import styled from "styled-components";
import Svg, { SvgProps } from 'react-native-svg';
import AccountIcon from '@/src/assets/svg/AccountIcon.svg'
import BoxesIcon from '@/src/assets/svg/BoxesIcon.svg'
import NavBarHearthIcon from '@/src/assets/svg/NavBarHearthIcon.svg'
import SubstractIcon from '@/src/assets/svg/SubstractIcon.svg'
import { useRoute } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Feather from '@expo/vector-icons/Feather';
import { useThemeColor } from "@/src/hooks/useThemeColor";



const NavBar = () => {

    const fill = useThemeColor({}, 'black');
    const stroke = useThemeColor({}, 'placeholder');

    const router = useRouter();
    const route = useRoute();

    const [routeName, setRouteName] = useState<string>(route.name);

    useEffect(() => {
        setRouteName(route.name);
    }, [route]);

    return (
        <Footer>
        <NavBarContainer>
            <Feather name="target"
                size={24}
                color = {routeName === "index" ? fill : stroke}
                onPress={()=> router.replace("/(tabs)")} />
            <Feather name="heart"
                size={24}
                color = {routeName === "liked" ? fill : stroke}
                onPress={()=> router.replace("/(tabs)/liked")} />
            <Feather name="briefcase"
                size={24}
                color = {routeName === "projects" ? fill : stroke}
                onPress={()=> router.replace("/(tabs)/projects")}/>
            <Feather name="user"
                size={24}
                color = {routeName === "profile" ? fill : stroke}
                onPress={()=> router.replace("/(tabs)/profile")}/>

        </NavBarContainer>
        </Footer>
    );

};

const Footer = styled(View)`
    position: absolute;
    bottom: 0;
    align-self: center;
    align-items: center;
    margin-bottom: 32px;
`;
const NavBarContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    border-radius: 36px;
    justify-content: space-around;
    width: 90%;
    padding: 16px;
    background-color: #ffffff99;
    blue: 1px solid black;
`

export default NavBar;