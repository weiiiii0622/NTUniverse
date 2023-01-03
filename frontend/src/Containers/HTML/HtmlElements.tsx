import TutorialModal from "../../Components/HTML/TutorialModal"
import MySider from "../../Components/HTML/Sider";
import LoginModal from "../../Components/HTML/LoginModal";
import LogoutModal from "../../Components/HTML/LogoutModal";
import ProfileModal from "../../Components/HTML/ProfileModal";
import BulletinModal from "../../Components/HTML/BulletinModal";
import ChatRoomModal from "../../Containers/HTML/ChatRoom/ChatRoomModal";
import AboutModal from "../../Components/HTML/AboutModal";
import TeleportTransition from "../../Components/HTML/TeleportTransition";
import LoadingCover from "../../Components/HTML/LoadingCover";
import { useMyContext } from "../../Utils/useMyContext";

const AppHtmlElements = () => {
    const { isLoading } = useMyContext();

    return(
        <>
            
            <LoginModal />
            <LogoutModal />
            <ProfileModal />
            <TutorialModal />
            <BulletinModal />
            <AboutModal />
            
            {/* {
                isLoading
                ?
                <LoadingCover />
                :
                null
            } */}
            <MySider />
            
            <ChatRoomModal />
            
            <TeleportTransition />
            
        </>
    )
}

export default AppHtmlElements;