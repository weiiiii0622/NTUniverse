import TutorialModal from "../../Components/HTML/TutorialModal"
import MySider from "../../Components/HTML/Sider";
import LoginModal from "../../Components/HTML/LoginModal";
import LogoutModal from "../../Components/HTML/LogoutModal";
import ProfileModal from "../../Components/HTML/ProfileModal";
import BulletinModal from "../../Components/HTML/BulletinModal";
import AboutModal from "../../Components/HTML/AboutModal";
import TeleportTransition from "../../Components/HTML/ChangeScene/TeleportTransition";
import LoadingCover from "../../Components/HTML/LoadingCover";
import { useMyContext } from "../../Utils/useMyContext";
import { useEffect } from "react";

const AppHtmlElements = () => {
    const { isLoading, isChangingScene, setIsChangeScene, finish, setFinish } = useMyContext();
    useEffect(() => {
        if(isChangingScene['scene']!=="") setFinish(false);
        console.log("OUT isChanging:")
        console.log(isChangingScene);
    }, [isChangingScene])

    return(
        <>
            
            <LoginModal />
            <LogoutModal />
            <ProfileModal />
            <TutorialModal />
            <BulletinModal />
            <AboutModal />
            {/* <LoadingCover /> */}
            {/* {
                isLoading
                ?
                <LoadingCover />
                :
                null
            } */}
            <MySider />
            {/* <TeleportTransition scene={"Hi"}/> */}
            {!finish ? <TeleportTransition scene={"HI"}/>: null}
            
            
        </>
    )
}

export default AppHtmlElements;