import TutorialModal from "../../Components/HTML/TutorialModal"
import MySider from "../../Components/HTML/Sider";
import LoginModal from "../../Components/HTML/LoginModal";
import LogoutModal from "../../Components/HTML/LogoutModal";
import ProfileModal from "../../Components/HTML/ProfileModal";

const AppHtmlElements = () => {

    return(
        <>
            <LoginModal />
            <LogoutModal />
            <ProfileModal />
            <TutorialModal />
            <MySider />
        </>
    )
}

export default AppHtmlElements;