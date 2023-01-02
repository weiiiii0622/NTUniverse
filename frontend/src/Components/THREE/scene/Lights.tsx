import { useHelper } from "@react-three/drei"
import { useControls } from "leva";
import { useRef, useEffect } from "react"
import { CameraHelper, DirectionalLight, DirectionalLightHelper } from "three";

export default function Lights() {
    const ref = useRef(null!);
    useHelper(ref, DirectionalLightHelper, 1);

    useEffect(() => {
        ref!.current?.lookAt(0, 0, 0);
    }, [ref]);

    const { pos, y } = useControls({
        y: {
            value: 36,
            step: 0.5,
        },
        pos: {
            x: 38,
            z: -35,
        }
    });

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight
                color={'#FFEDD6'}
                position={[pos.x, y, pos.z]}
                quaternion={[0.954, 0, 0, -0.301]}
                intensity={3}
                castShadow
                shadow-camera-left={-50}
                shadow-mapSize={[2048, 2048]}
                ref={ref}
            />
        </>
    )
}