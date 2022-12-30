import { Triplet } from "@react-three/cannon";
import { useState, useEffect, createContext, useContext } from "react";

interface IContext {
    tutorialModalOpen: boolean,
    setTutorialModalOpen(x: boolean): void,
    isLogin: boolean,
    setIsLogin(x: boolean): void,
    loginModalOpen: boolean,
    setLoginModalOpen(x: boolean): void,

    bikePosition: Triplet,
}

const MyContext = createContext<IContext>({
    tutorialModalOpen: false,
    setTutorialModalOpen: (x) => { },
    isLogin: false,
    setIsLogin: (x) => { },
    loginModalOpen: false,
    setLoginModalOpen: (x) => { },

    bikePosition: [0, 0, 0],
});



const MyProvider = (props: any) => {

    // TutorialModal
    const [tutorialModalOpen, setTutorialModalOpen] = useState(false);

    // MySider
    const [isLogin, setIsLogin] = useState(false);

    // LoginModal
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    // Add Other component......

    return (
        <MyContext.Provider
            value={{
                tutorialModalOpen, isLogin, loginModalOpen,
                setTutorialModalOpen, setIsLogin, setLoginModalOpen,
            }}
            {...props}
        />
    );
}

// usage:
// const { "your state", ... } = useMyContext();
const useMyContext = () => useContext(MyContext);

export { MyContext, MyProvider, useMyContext };