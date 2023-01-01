import { Triplet } from "@react-three/cannon";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_USER_MUTATION, UPDATE_USER_MUTATION } from "../graphql";
import { SetStateType } from "./type";

interface IContext {
    tutorialModalOpen: boolean,
    setTutorialModalOpen(x: boolean): void,
    isLogin: boolean,
    setIsLogin(x: boolean): void,
    loginModalOpen: boolean,
    setLoginModalOpen(x: boolean): void,
    logoutModalOpen: boolean,
    setLogoutModalOpen(x: boolean): void,
    profileModalOpen: boolean,
    setProfileModalOpen(x: boolean): void,
    bulletinModalOpen: boolean,
    setBulletinModalOpen(x: boolean): void,
    me: object,
    setMe(x: object): void,

    login: any,
    updateUser: any,

    bikePosition: Triplet,
    bikeEnabled: boolean,
    setBikeEnabled: SetStateType<boolean>,
}

const MyContext = createContext<IContext>({
    tutorialModalOpen: false,
    setTutorialModalOpen: (x) => { },
    isLogin: false,
    setIsLogin: (x) => { },
    loginModalOpen: false,
    setLoginModalOpen: (x) => { },
    logoutModalOpen: false,
    setLogoutModalOpen: (x) => { },
    profileModalOpen: false,
    setProfileModalOpen: (x) => { },
    bulletinModalOpen: false,
    setBulletinModalOpen: (x) => { },
    me: {},
    setMe: (x) => { },

    login: () => { },
    updateUser: () => { },

    bikePosition: [0, 0, 0],
    bikeEnabled: false,
    setBikeEnabled: () => { },
});



const MyProvider = (props: any) => {

    /**
     * 
     * Modal
     * 
     */

    // TutorialModal
    const [tutorialModalOpen, setTutorialModalOpen] = useState(true);

    // ProfileModal
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    // LoginModal
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    // LogoutModal
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    // BulletinModal
    const [bulletinModalOpen, setBulletinModalOpen] = useState(false);

    /**
     * 
     * User
     * 
     */

    // User info
    const [me, setMe] = useState({ id:"" ,email: "", first_name: "", last_name: "", nick_name: "", picture: "", description: "" });

    // Login - state
    const [isLogin, setIsLogin] = useState(false);

    // Login - query/create User
    const [login] = useMutation(CREATE_USER_MUTATION);
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);

    // Add Other component......


    /**
     * Bike
     */

    const [bikeEnabled, setBikeEnabled] = useState(true);



    return (
        <MyContext.Provider
            value={{
                tutorialModalOpen, isLogin, loginModalOpen, logoutModalOpen, profileModalOpen, bulletinModalOpen, me,
                setTutorialModalOpen, setIsLogin, setLoginModalOpen, setLogoutModalOpen, setProfileModalOpen, setBulletinModalOpen, login, updateUser, setMe,
                bikeEnabled, setBikeEnabled,
            }}
            {...props}
        />
    );
}

// usage:
// const { "your state", ... } = useMyContext();
const useMyContext = () => useContext(MyContext);

export { MyContext, MyProvider, useMyContext };