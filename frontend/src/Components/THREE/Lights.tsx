import { useHelper } from "@react-three/drei"
import { useControls } from "leva";
import { useRef } from "react"
import { CameraHelper, DirectionalLight, DirectionalLightHelper } from "three";

export default function Lights() {
    const ref = useRef();
    // useHelper(ref, DirectionalLightHelper, 1);

    return (
        <>
            <ambientLight intensity={0.24} />
            <directionalLight
                color={'#ffffff'}
                position={[10, 10, 10]}
                intensity={3.5}
                castShadow
                shadow-mapSize={[2048, 2048]}
                ref={ref}
               />
        </>
    )
}