import { Triplet } from "@react-three/cannon";
import { useContext } from "react";
import { createContext, useState } from "react";
import { SetStateType } from "../../Utils/type";

type Location = "SFu" | "MainLib";

interface IContext {

    /**
     * Bike
     */
    bikePosition: Triplet,  // for read, not for control!
    setBikePosition: SetStateType<Triplet>,
    bikeEnabled: boolean,
    setBikeEnabled: SetStateType<boolean>,

    location: Location,
    setLocation: SetStateType<Location>,
    positionFromLocations: Record<Location, Triplet>,

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
});

export function BikeProvider(props: any) {

    const [bikePosition, setBikePosition] = useState<Triplet>([0, 0, 0]);
    const [bikeEnabled, setBikeEnabled] = useState(true);

    const [location, setLocation] = useState<Location>("SFu");
    const positionFromLocations = {
        SFu: [0, 0, 0],
        MainLib: [300, 0, 300],
    };

    return <BikeContext.Provider
        value={{
            bikePosition, setBikePosition,
            bikeEnabled, setBikeEnabled,
            location, setLocation,
            positionFromLocations,
        }}
        {...props}
    />
}

export default function useBikeContext() {
    return useContext(BikeContext);
}