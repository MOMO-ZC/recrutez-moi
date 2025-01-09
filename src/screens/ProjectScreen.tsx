import { ThemedText } from "../components/ThemedText";
import NavBar from "../components/ui/NavBar";
import { Header, ScreenContainer } from "./common/components";



const ProjectScreen = () => {
    return (
        <ScreenContainer>
            <Header>
            <ThemedText type="title"> Project Screen </ThemedText>
            </Header>
            {/* <NavBar/> */}
        </ScreenContainer>
    )
};

export default ProjectScreen;