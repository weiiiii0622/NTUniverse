import { Triplet } from "@react-three/cannon";
import { AccumulativeShadows, ContactShadows, OrbitControls, OrthographicCamera, PerspectiveCamera, RandomizedLight, softShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Perf } from "r3f-perf";
import { createContext, useState } from "react";
import Camera from "../../Components/THREE/Camera";
import Lights from "../../Components/THREE/Lights";
import AppOrbitControls from "../../Components/THREE/OrbitControls";
import Shadow from "../../Components/THREE/Shadow";
import TestCube from "../../Components/THREE/TestCube";
import World from "./World";

const debug = true;

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

// softShadows({
//     frustum: 3.75,
//     size: 0.005,
//     near: 9.5,
//     samples: 20,
//     rings: 11
// });

export default function AppCanvas() {

    /**
     * Bike
     */
    const [bikePosition, setBikePosition] = useState<Triplet>([0, 0, 0]);
    const [bikeControlling, setBikeControlling] = useState<boolean>(false);

    return (
        <Canvas
        // shadows
        >
            {/* <AccumulativeShadows
                position={[0, - 0.99, 0]}
                scale={10}
                color="#316d39"
                opacity={0.3}
                frames={Infinity}
                temporal
                blend={10}
            >
                <RandomizedLight
                    // amount={8}
                    // radius={1}
                    // ambient={0.5}
                    // intensity={1}
                    position={[10, 5, 10]}
                // bias={0.001}
                />
            // </AccumulativeShadows> */}
            <Shadow />
            <Perf position="top-left" />
            <ThreeContext.Provider value={{
                bikePosition,
                setBikePosition,
                bikeControlling,
                setBikeControlling,
            }}>
                {/* <axesHelper args={[10]} /> */}
                {/* <gridHelper /> */}
                <Lights />
                <AppOrbitControls enabled={debug} />
                {debug ? null
                    // ? <OrthographicCamera
                    //     makeDefault
                    //     position={[10, 5, 0]}
                    //     zoom={70}
                    // />
                    : <Camera />
                }
                <World />
            </ThreeContext.Provider>
        </Canvas >
    )
}

export { ThreeContext };