import TutorialModal from "../../Components/HTML/TutorialModal"
import MySider from "../../Components/HTML/Sider";
import LoginModal from "../../Components/HTML/LoginModal";
import LogoutModal from "../../Components/HTML/LogoutModal";
import ProfileModal from "../../Components/HTML/ProfileModal";
import BulletinModal from "../../Components/HTML/BulletinModal";
import ChatRoomModal from "../../Containers/HTML/ChatRoom/ChatRoomModal";
import AboutModal from "../../Components/HTML/AboutModal";
import SettingModal from "../../Components/HTML/SettingModal";
import TeleportTransition from "../../Components/HTML/ChangeScene/TeleportTransition";
import LoadingCover from "../../Components/HTML/LoadingCover";
import { useMyContext } from "../../Utils/useMyContext";
import { useEffect } from "react";

const AppHtmlElements = () => {
    const { isChangingScene, finish, setFinish, loadFinished } = useMyContext();
    useEffect(() => {
        if (isChangingScene['scene'] !== "") setFinish(false);
    }, [isChangingScene])

    return (
        <>

            <LoginModal />
            <LogoutModal />
            <ProfileModal />
            <TutorialModal />
            <BulletinModal />
            <AboutModal />
            <SettingModal />
            {loadFinished
                ?
                null
                : <LoadingCover />
            }
            <MySider />
            {/* <TeleportTransition scene={"Hi"}/> */}
            {!finish ? <TeleportTransition scene={"HI"}/>: null}
            
            {loadFinished? <ChatRoomModal /> : null}
            
        </>
    )
}

export default AppHtmlElements;
