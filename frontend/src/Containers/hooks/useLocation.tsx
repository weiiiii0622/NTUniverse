import { Triplet } from "@react-three/cannon";
import { useContext } from "react";
import { createContext, useState } from "react";
import { SetStateType } from "../../Utils/type";

type TLocation = "SFu" | "MainLib";

export type { TLocation };

interface IContext {

    location: TLocation,
    setLocation: SetStateType<TLocation>,
    locationInfos: Record<TLocation, {
        name: string,
        position: Triplet,
        rotation: Triplet,
    }>,
}

const LocationContext = createContext<IContext>({
    location: "SFu",
    setLocation: () => { },
    locationInfos: {
        "SFu": {
            position: [0, 0, 0] as Triplet,
            rotation: [0, Math.PI / 2, 0] as Triplet,
            name: '小福廣場',
        },
        "MainLib": {
            position: [300, 0, 300] as Triplet,
            rotation: [0, 0, 0] as Triplet,
            name: '總圖書館',
        }
    },
});

export function LocationProvider(props: any) {

    const [location, setLocation] = useState<TLocation>("SFu");
    const locationInfos = {
        "SFu": {
            position: [0, 0, 0] as Triplet,
            rotation: [0, Math.PI / 4 + Math.PI / 2, 0] as Triplet,
            name: '小福廣場',
        },
        "MainLib": {
            position: [300, 0, 300] as Triplet,
            rotation: [0, 0, 0] as Triplet,
            name: '總圖書館',
        }
    };

    return <LocationContext.Provider
        value={{
            location, setLocation,
            locationInfos,
        }}
        {...props}
    />
}

export default function useLocation() {
    return useContext(LocationContext);
}