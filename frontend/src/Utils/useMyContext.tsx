import { Triplet } from "@react-three/cannon";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_USER_MUTATION } from "../graphql";

interface IContext {
    tutorialModalOpen: boolean,
    setTutorialModalOpen(x: boolean): void,
    isLogin: boolean,
    setIsLogin(x: boolean): void,
    loginModalOpen: boolean,
    setLoginModalOpen(x: boolean): void,

    login: any,

    bikePosition: Triplet,
}

const MyContext = createContext<IContext>({
    tutorialModalOpen: false,
    setTutorialModalOpen: (x) => { },
    isLogin: false,
    setIsLogin: (x) => { },
    loginModalOpen: false,
    setLoginModalOpen: (x) => { },

    login: () => { },

    bikePosition: [0, 0, 0],
});



const MyProvider = (props: any) => {

    // TutorialModal
    const [tutorialModalOpen, setTutorialModalOpen] = useState(true);

    // MySider
    const [isLogin, setIsLogin] = useState(false);

    // LoginModal
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    // Login - query/create User
    const [login] = useMutation(CREATE_USER_MUTATION);

    // Add Other component......

    return (
        <MyContext.Provider
            value={{
                tutorialModalOpen, isLogin, loginModalOpen,
                setTutorialModalOpen, setIsLogin, setLoginModalOpen, login,
            }}
            {...props}
        />
    );
}

// usage:
// const { "your state", ... } = useMyContext();
const useMyContext = () => useContext(MyContext);

export { MyContext, MyProvider, useMyContext };