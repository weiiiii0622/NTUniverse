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
    UPDATE_BULLETINMSG_MUTATION,

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
    aboutModalOpen: boolean,
    setAboutModalOpen(x: boolean): void,
    me: object,
    setMe(x: object): void,
    location: string,
    setLocation: SetStateType<string>,
    bulletinMessages: any,
    setBulletinMessages: any,
    profileUser: any,
    setProfileUser: SetStateType<string>,

    login: any,
    updateUser: any,
    leaveComment: any,
    likeComment: any,

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
    aboutModalOpen: false,
    setAboutModalOpen: (x) => { },
    me: {},
    setMe: (x) => { },
    location: "",
    setLocation: () => { },
    bulletinMessages: [],
    setBulletinMessages: () => { },
    profileUser: "",
    setProfileUser: () => { },
    login: () => { },
    updateUser: () => { },
    leaveComment: () => { },
    likeComment: () => { },

    bikePosition: [0, 0, 0],
    bikeEnabled: false,
    setBikeEnabled: () => { },
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
    const [profileUser, setProfileUser] = useState("63b2c6e4efca665348698a8b");
    const [profileModalOpen, setProfileModalOpen] = useState(false);

    // LoginModal
    const [loginModalOpen, setLoginModalOpen] = useState(false);

    // LogoutModal
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);

    // BulletinModal
    const [bulletinModalOpen, setBulletinModalOpen] = useState(false);

    // AboutModal
    const [aboutModalOpen, setAboutModalOpen] = useState(false);

    /**
     * 
     * User
     * 
     */

    // User info
    const [me, setMe] = useState({ id: "", email: "", first_name: "", last_name: "", nick_name: "", picture: "", description: "" });

    // For Profile

    // Login - state
    const [isLogin, setIsLogin] = useState(false);

    // Login - query/create User
    const [ login ] = useMutation(CREATE_USER_MUTATION);
    const [ updateUser ] = useMutation(UPDATE_USER_MUTATION);

    // Add Other component......


    /**
     * Bike
     */

    const [bikeEnabled, setBikeEnabled] = useState(true);


    /**
     * 
     * Bulletin
     * 
     */
    const [ location, setLocation ] = useState("");
    const [ bulletinMessages, setBulletinMessages ] = useState<Object[]>([]);
    const [ leaveComment ]  = useMutation(CREATE_BULLETINMSG_MUTATION);
    const [ likeComment ]  = useMutation(UPDATE_BULLETINMSG_MUTATION);


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
            console.log(`sub! ${location}`);
            unsub = subscribeToMore({
                document: BULLETIN_SUBSCRIPTION,
                variables: { location: location },
                updateQuery: (prev, { subscriptionData }) => {
                    
                    //console.log("subData:")
                    //console.log(subscriptionData);
                    if (!subscriptionData) return prev;
                    var newMessage = subscriptionData.data.bulletin.data;
                    const type = subscriptionData.data.bulletin.type;
                    //console.log("prev:");
                    //console.log(prev);
                    let temp = _.cloneDeep(prev);
                    //console.log(temp);
                    if(temp.bulletin === undefined){
                        temp = {
                            bulletin:{
                                messages:[]
                            }
                        }
                    }
                    if(type === "CREATED"){
                        return {
                            bulletin:{
                                __typename: "Bulletin",
                                location: location,
                                messages: [...temp.bulletin.messages, newMessage],
                            }
                        };
                    }
                    else if(type === "UPDATED"){
                        let newMsgs = temp.bulletin.messages;
                        let idx = newMsgs.findIndex((msg) => {return msg.id === newMessage.id});
                        //console.log(idx);
                        newMsgs[idx] = newMessage;
                        return {
                            bulletin:{
                                __typename: "Bulletin",
                                location: location,
                                messages: [...newMsgs],
                            }
                        };
                    }
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
                tutorialModalOpen, isLogin, loginModalOpen, logoutModalOpen, profileModalOpen, bulletinModalOpen, aboutModalOpen, me, location, bulletinMessages, profileUser,
                setTutorialModalOpen, setIsLogin, setLoginModalOpen, setLogoutModalOpen, setProfileModalOpen, setBulletinModalOpen, setAboutModalOpen, login, updateUser, leaveComment, likeComment, setMe,
                setProfileUser,
                setLocation, setBulletinMessages,
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