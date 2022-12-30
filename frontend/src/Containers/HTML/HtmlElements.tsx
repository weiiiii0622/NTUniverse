import TutorialModal from "../../Components/HTML/TutorialModal"
import MySider from "../../Components/HTML/Sider";
import LoginModal from "../../Components/HTML/LoginModal";
import ProfileModal from "../../Components/HTML/ProfileModal";

const AppHtmlElements = () => {

    return(
        <>
            <LoginModal />
            <ProfileModal />
            <TutorialModal />
            <MySider />
        </>
    )
}

export default AppHtmlElements;