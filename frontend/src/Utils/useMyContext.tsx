import { Triplet } from "@react-three/cannon";
import { useState, useEffect, createContext, useContext } from "react";

interface IContext {
    tutorialModalOpen: boolean,
    setTutorialModalOpen(x: boolean): void,

    bikePosition: Triplet,
}

const MyContext = createContext<IContext>({
    tutorialModalOpen: false,
    setTutorialModalOpen: (x) => { },

    bikePosition: [0, 0, 0],
});



const MyProvider = (props: any) => {

    // TutorialModal
    const [tutorialModalOpen, setTutorialModalOpen] = useState(false);

    // Add Other component......

    return (
        <MyContext.Provider
            value={{
                tutorialModalOpen,
                setTutorialModalOpen
            }}
            {...props}
        />
    );
}

// usage:
// const { "your state", ... } = useMyContext();
const useMyContext = () => useContext(MyContext);

export { MyContext, MyProvider, useMyContext };