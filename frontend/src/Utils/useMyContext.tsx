import { useState, useEffect, createContext, useContext } from "react";

const MyContext = createContext({
    tutorialModalOpen: false,
    setTutorialModalOpen: (boolean) => {},
    // status: {},
    // me: "",
    // friend: "",
    // boxName: "",
    // hasInit: false,
    // signedIn: false,
    // messages: [],
    // chatBoxes: [],
    // startChat: () => {},
    // sendMessage: () => {},
    //clearMessages: () => {},
    //closeWS: () => {},
});

const MyProvider = (props) => {

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

export { MyProvider, useMyContext };