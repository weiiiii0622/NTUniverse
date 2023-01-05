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

    bikeSpeedValue: number,
    setBikeSpeedValue: SetStateType<number>,
    volumeValue: number,
    setVolumeValue: SetStateType<number>,

    prevCameraType: BikeCameraType,
    cameraType: BikeCameraType,
    setCameraType: (type: BikeCameraType) => any,
}

const BikeContext = createContext<IContext>({

    bikePosition: [0, 0, 0],
    setBikePosition: () => { },
    bikeEnabled: false,
    setBikeEnabled: () => { },
    bikeSpeedValue: -1,
    setBikeSpeedValue: () => { },
    volumeValue: -1,
    setVolumeValue: () => { },
    prevCameraType: 'default',
    cameraType: 'default',
    setCameraType: (type) => { },
});

export function BikeProvider(props: any) {

    const [bikePosition, setBikePosition] = useState<Triplet>([0, 0, 0]);
    const [bikeEnabled, setBikeEnabled] = useState(false);
    const [bikeSpeedValue, setBikeSpeedValue] = useState(50);
    const [volumeValue, setVolumeValue] = useState(50);
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
            bikeSpeedValue, setBikeSpeedValue,
            volumeValue, setVolumeValue,
            cameraType, setCameraType: handleCameraTypeChange,
            prevCameraType,
        }}
        {...props}
    />
}

export default function useBikeContext() {
    return useContext(BikeContext);
}