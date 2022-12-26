import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import AppOrbitControls from "./OrbitControls";
import World from "../Containers/World";

declare global {
    namespace THREE {
        interface Object3D<T> {

        }
    }
}

export default function AppCanvas() {
    return (
        <Canvas
            shadows
        >
            <axesHelper args={[10]} />
            <gridHelper />
            <Lights />
            <AppOrbitControls />
            <PerspectiveCamera
                makeDefault
                position={[5, 20, 15]}
            />
            <World />
        </Canvas>
    )
}