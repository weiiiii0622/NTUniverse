import { Triplet } from "@react-three/cannon";
import { useContext } from "react";
import { createContext, useState } from "react";
import { SetStateType } from "../../Utils/type";


interface IContext {

    /**
     * Bike
     */
    bikePosition: Triplet,  // for read, not for control!
    setBikePosition: SetStateType<Triplet>,
    bikeEnabled: boolean,
    setBikeEnabled: SetStateType<boolean>,

    bikeMaxSpeed: number,
    setBikeMaxSpeed: SetStateType<boolean>,
    bikeMaxVolume: number,
    setBikeMaxVolume: SetStateType<number>,
}

const BikeContext = createContext<IContext>({

    bikePosition: [0, 0, 0],
    setBikePosition: () => { },
    bikeEnabled: false,
    setBikeEnabled: () => { },
    bikeMaxSpeed: 0,
    setBikeMaxSpeed: () => { },
    bikeMaxVolume: 0,
    setBikeMaxVolume: () => { },
});

export function BikeProvider(props: any) {

    const [bikePosition, setBikePosition] = useState<Triplet>([0, 0, 0]);
    const [bikeEnabled, setBikeEnabled] = useState(false);
    const [bikeMaxSpeed, setBikeMaxSpeed] = useState(0);
    const [bikeMaxVolume, setBikeMaxVolume] = useState(0);

    return <BikeContext.Provider
        value={{
            bikePosition, setBikePosition,
            bikeEnabled, setBikeEnabled,
            bikeMaxSpeed, setBikeMaxSpeed,
            bikeMaxVolume, setBikeMaxVolume,
        }}
        {...props}
    />
}

export default function useBikeContext() {
    return useContext(BikeContext);
}