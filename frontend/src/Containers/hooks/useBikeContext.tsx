import { Triplet } from "@react-three/cannon";
import { type } from "os";
import { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import { SetStateType } from "../../Utils/type";

type BikeCameraType = 'default' | 'tutorial' | 'free' | 'first';
export type { BikeCameraType };

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

    prevCameraType: BikeCameraType,
    cameraType: BikeCameraType,
    setCameraType: (type: BikeCameraType) => any,
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
    prevCameraType: 'default',
    cameraType: 'default',
    setCameraType: (type) => { },
});

export function BikeProvider(props: any) {

    const [bikePosition, setBikePosition] = useState<Triplet>([0, 0, 0]);
    const [bikeEnabled, setBikeEnabled] = useState(false);
    const [bikeMaxSpeed, setBikeMaxSpeed] = useState(0);
    const [bikeMaxVolume, setBikeMaxVolume] = useState(0);
    const [cameraType, setCameraType] = useState<BikeCameraType>('default');
    const [prevCameraType, setPrevCameraType] = useState<BikeCameraType>('default');

    const handleCameraTypeChange = (newType: BikeCameraType) => {
        setCameraType(prevType => {
            setPrevCameraType(prevType);
            return newType;
        });
    }

    return <BikeContext.Provider
        value={{
            bikePosition, setBikePosition,
            bikeEnabled, setBikeEnabled,
            bikeMaxSpeed, setBikeMaxSpeed,
            bikeMaxVolume, setBikeMaxVolume,
            cameraType, setCameraType: handleCameraTypeChange,
            prevCameraType,
        }}
        {...props}
    />
}

export default function useBikeContext() {
    return useContext(BikeContext);
}