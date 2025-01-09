import { ThemedText } from "../components/ThemedText";
import NavBar from "../components/ui/NavBar";
import { Header, ScreenContainer } from "./common/components";



const ProfileScreen = () => {
    return (
        <ScreenContainer>
            <Header>
            <ThemedText type="title"> Profile Screen </ThemedText>
            </Header>
            <NavBar/>
        </ScreenContainer>
    )
};

export default ProfileScreen;