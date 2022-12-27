import { OrbitControls, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Camera from "../../Components/THREE/Camera";
import Lights from "../../Components/THREE/Lights";
import AppOrbitControls from "../../Components/THREE/OrbitControls";
import World from "./World";

const debug = false;

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