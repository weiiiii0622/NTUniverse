import { Triplet } from "@react-three/cannon";
import { useState, useEffect, createContext, useContext } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_USER_MUTATION, UPDATE_USER_MUTATION } from "../graphql";

interface IContext {
    tutorialModalOpen: boolean,
    setTutorialModalOpen(x: boolean): void,
    isLogin: boolean,
    setIsLogin(x: boolean): void,
    loginModalOpen: boolean,
    setLoginModalOpen(x: boolean): void,
    profileModalOpen: boolean,
    setProfileModalOpen(x: boolean): void,
    me: object,
    setMe(x: object): void,

    login: any,
    updateUser: any,

    bikePosition: Triplet,
}

const MyContext = createContext<IContext>({
    tutorialModalOpen: false,
    setTutorialModalOpen: (x) => { },
    isLogin: false,
    setIsLogin: (x) => { },
    loginModalOpen: false,
    setLoginModalOpen: (x) => { },
    profileModalOpen: false,
    setProfileModalOpen: (x) => { },
    me: {},
    setMe: (x) => { },

    login: () => { },
    updateUser: () => { },

    bikePosition: [0, 0, 0],
});



const MyProvider = (props: any) => {

    /**
     * 
     * Modal
     * 
     */

    // TutorialModal
    const [tutorialModalOpen, setTutorialModalOpen] = useState(false);

    // ProfileModal
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    // LoginModal
    const [loginModalOpen, setLoginModalOpen] = useState(false);


    /**
     * 
     * User
     * 
     */

    // User info
    const[me, setMe] = useState({ email:"", first_name:"", last_name:"", nick_name:"", picture:"", description:"" });

    // Login - state
    const [isLogin, setIsLogin] = useState(false);

    // Login - query/create User
    const [login] = useMutation(CREATE_USER_MUTATION);
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);

    // Add Other component......




    return (
        <MyContext.Provider
            value={{
                tutorialModalOpen, isLogin, loginModalOpen, profileModalOpen, me,
                setTutorialModalOpen, setIsLogin, setLoginModalOpen, setProfileModalOpen, login, updateUser, setMe,
            }}
            {...props}
        />
    );
}

// usage:
// const { "your state", ... } = useMyContext();
const useMyContext = () => useContext(MyContext);

export { MyContext, MyProvider, useMyContext };