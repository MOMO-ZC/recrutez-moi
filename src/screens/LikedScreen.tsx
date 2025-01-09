import { ThemedText } from "../components/ThemedText";
import NavBar from "../components/ui/NavBar";
import { Header, ScreenContainer } from "./common/components";



const LikedScreen = () => {
    return (
        <ScreenContainer>
            <Header>
            <ThemedText type="title"> Liked Screen </ThemedText>
            </Header>
            <NavBar/>
        </ScreenContainer>
    )
};

export default LikedScreen;