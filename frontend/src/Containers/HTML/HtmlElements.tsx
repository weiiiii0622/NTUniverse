import TutorialModal from "../../Components/HTML/TutorialModal"
import MySider from "../../Components/HTML/Sider";
import LoginModal from "../../Components/HTML/LoginModal";
import LogoutModal from "../../Components/HTML/LogoutModal";
import ProfileModal from "../../Components/HTML/ProfileModal";
import BulletinModal from "../../Components/HTML/BulletinModal";
import AboutModal from "../../Components/HTML/AboutModal";
import TeleportTransition from "../../Components/HTML/TeleportTransition";

const AppHtmlElements = () => {

    return(
        <>
            <LoginModal />
            <LogoutModal />
            <ProfileModal />
            <TutorialModal />
            <BulletinModal />
            <AboutModal />
            <TeleportTransition />
            <MySider />
        </>
    )
}

export default AppHtmlElements;