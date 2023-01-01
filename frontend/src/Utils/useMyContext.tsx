import { Triplet } from "@react-three/cannon";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { SetStateType } from "./type";
import _ from "lodash";

import { 
    BULLETIN_QUERY,

    CREATE_USER_MUTATION,
    UPDATE_USER_MUTATION,
    CREATE_BULLETINMSG_MUTATION,

    BULLETIN_SUBSCRIPTION,
} from "../graphql";


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
    location: string,
    setLocation: SetStateType<string>,
    bulletinMessages: any,
    setBulletinMessages: any,

    login: any,
    updateUser: any,
    leaveComment: any,

    bikePosition: Triplet,
    bikeEnabled: boolean,
    setBikeEnabled: SetStateType<boolean>,

    chatRoomModalOpen: boolean,
    setChatRoomModalOpen(x: boolean): void,
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
    location: "",
    setLocation: () => { },
    bulletinMessages: [],
    setBulletinMessages: () => { },
    login: () => { },
    updateUser: () => { },
    leaveComment: () => { },

    bikePosition: [0, 0, 0],
    bikeEnabled: false,
    setBikeEnabled: () => { },

    chatRoomModalOpen: false,
    setChatRoomModalOpen: (x) => { },
});

//const _ = require('lodash');

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
    const [me, setMe] = useState({ id: "", email: "", first_name: "", last_name: "", nick_name: "", picture: "", description: "" });

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

    // ChatRoomModal
    const [chatRoomModalOpen, setChatRoomModalOpen] = useState(false);

    /**
     * 
     * Bulletin
     * 
     */
    const [ location, setLocation ] = useState("");
    const [ bulletinMessages, setBulletinMessages ] = useState<Object[]>([]);
    const [ leaveComment ]  = useMutation(CREATE_BULLETINMSG_MUTATION);

    const {data, loading, subscribeToMore} = useQuery(BULLETIN_QUERY, {
        variables:{
            location: location,
        },
        fetchPolicy: "cache-and-network",
    })

    useEffect(() => {
        //console.log("Set Data!");
        //console.log(data);
        if(data!==undefined) setBulletinMessages([...data.bulletin.messages]);
    }, [data])

    useEffect(() => {
        //console.log(`Bulletin changed to: ${location}`);
    }, [location])

    useEffect(() => {
        let unsub;
        try {
            //console.log(`sub! ${location}`);
            unsub = subscribeToMore({
                document: BULLETIN_SUBSCRIPTION,
                variables: { location: location },
                updateQuery: (prev, { subscriptionData }) => {
                    
                    //console.log("subData:")
                    //console.log(subscriptionData);
                    if (!subscriptionData) return prev;
                    const newMessage = subscriptionData.data.bulletin;
                    //console.log("prev:");
                    //console.log(prev);
                    let temp = _.cloneDeep(prev);
                    //console.log(temp);
                    if(temp === undefined){
                        temp = {
                            bulletin:{
                                messages:[]
                            }
                        }
                    }
                    return {
                        bulletin:{
                            __typename: "Bulletin",
                            location: location,
                            messages: [...temp.bulletin.messages, newMessage],
                        }
                    };
                },
            });
        } catch (e) {
            console.log(e);
        }
        return ()=>unsub();
    }, [subscribeToMore, location]);

    return (
        <MyContext.Provider
            value={{
                tutorialModalOpen, isLogin, loginModalOpen, logoutModalOpen, profileModalOpen, bulletinModalOpen, me, location, bulletinMessages,
                setTutorialModalOpen, setIsLogin, setLoginModalOpen, setLogoutModalOpen, setProfileModalOpen, setBulletinModalOpen, login, updateUser, leaveComment, setMe,
                setLocation, setBulletinMessages,
                bikeEnabled, setBikeEnabled,
                chatRoomModalOpen, setChatRoomModalOpen,
            }}
            {...props}
        />
    );
}

// usage:
// const { "your state", ... } = useMyContext();
const useMyContext = () => useContext(MyContext);

export { MyContext, MyProvider, useMyContext };