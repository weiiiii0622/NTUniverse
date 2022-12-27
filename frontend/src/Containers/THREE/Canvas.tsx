import { Triplet } from "@react-three/cannon";
import { OrbitControls, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { createContext, useState } from "react";
import Camera from "../../Components/THREE/Camera";
import Lights from "../../Components/THREE/Lights";
import AppOrbitControls from "../../Components/THREE/OrbitControls";
import TestCube from "../../Components/THREE/TestCube";
import World from "./World";

const debug = false;

interface IContext {
    /**
     * Bike
     */
    bikePosition: Triplet,
    setBikePosition(r: Triplet): any,
    bikeControlling: boolean,
    setBikeControlling(x: boolean): any,
};

const ThreeContext = createContext<IContext>({
    /**
     * Bike
     */
    bikePosition: [0, 0, 0,],
    setBikePosition: (r) => { },
    bikeControlling: false,
    setBikeControlling: (x) => { },
});

export default function AppCanvas() {

    /**
     * Bike
     */
    const [bikePosition, setBikePosition] = useState<Triplet>([0, 0, 0]);
    const [bikeControlling, setBikeControlling] = useState<boolean>(false);

    return (
        <Canvas
            shadows
        >
            <ThreeContext.Provider value={{
                bikePosition,
                setBikePosition,
                bikeControlling,
                setBikeControlling,
            }}>
                <axesHelper args={[10]} />
                <gridHelper />
                <Lights />
                <AppOrbitControls />
                {debug
                    ? <OrthographicCamera
                        makeDefault
                        position={[10, 5, 0]}
                        zoom={70}
                    />
                    : <Camera />
                }
                <World />

            </ThreeContext.Provider>
        </Canvas >
    )
}

export { ThreeContext };