import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import AppOrbitControls from "./OrbitControls";
import World from "./World";

declare global {
    namespace THREE {
        interface Object3D<T> {

        }
    }
}

export default function AppCanvas() {
    return (
        <Canvas >
            <axesHelper args={[10]} />
            <gridHelper />
            <ambientLight intensity={1.5} />
            <AppOrbitControls />
            <PerspectiveCamera
                makeDefault
                position={[5, 20, 15]}
            />
            <World />
        </Canvas>
    )
}