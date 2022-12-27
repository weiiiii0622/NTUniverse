import { OrbitControls, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Camera from "../Components/Camera";
import Lights from "../Components/Lights";
import AppOrbitControls from "../Components/OrbitControls";
import World from "./World";

const debug = false;

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
            {debug
                ? <OrthographicCamera
                    makeDefault
                    position={[10, 5, 0]}
                    zoom={70}
                />
                : <Camera />

            }
            <World />
        </Canvas>
    )
}