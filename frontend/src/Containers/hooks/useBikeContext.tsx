import { Triplet } from "@react-three/cannon";
import { useContext } from "react";
import { createContext, useState } from "react";
import { SetStateType } from "../../Utils/type";

type TLocation = "SFu" | "MainLib";

export type { TLocation };

interface IContext {

    /**
     * Bike
     */
    bikePosition: Triplet,  // for read, not for control!
    setBikePosition: SetStateType<Triplet>,
    bikeEnabled: boolean,
    setBikeEnabled: SetStateType<boolean>,

    location: TLocation,
    setLocation: SetStateType<TLocation>,
    positionFromLocations: Record<TLocation, Triplet>,
    nameFromLocations: Record<TLocation, string>,
}

const BikeContext = createContext<IContext>({

    bikePosition: [0, 0, 0],
    setBikePosition: () => { },
    bikeEnabled: false,
    setBikeEnabled: () => { },

    location: "SFu",
    setLocation: () => { },
    positionFromLocations: {
        SFu: [0, 0, 0],
        MainLib: [300, 0, 300],
    },
    nameFromLocations: {
        SFu: '小福廣場',
        MainLib: '總圖',
    }
});

export function BikeProvider(props: any) {

    const [bikePosition, setBikePosition] = useState<Triplet>([0, 0, 0]);
    const [bikeEnabled, setBikeEnabled] = useState(true);

    const [location, setLocation] = useState<TLocation>("SFu");
    const positionFromLocations = {
        SFu: [0, 0, 0],
        MainLib: [300, 0, 300],
    };
    const nameFromLocations = {
        SFu: '小福廣場',
        MainLib: '總圖',
    }

    return <BikeContext.Provider
        value={{
            bikePosition, setBikePosition,
            bikeEnabled, setBikeEnabled,
            location, setLocation,
            positionFromLocations,
            nameFromLocations,
        }}
        {...props}
    />
}

export default function useBikeContext() {
    return useContext(BikeContext);
}