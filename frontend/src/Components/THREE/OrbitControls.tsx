import { OrbitControls } from "@react-three/drei";
import { useContext } from "react";

import * as THREE from 'three';
import { ThreeContext } from "../../Containers/THREE/Canvas";

const debug = true;

export default function AppOrbitControls() {

    const { bikeControlling } = useContext(ThreeContext);

    return (
        <OrbitControls
            enabled={false}
            panSpeed={2.5}
            enableDamping
            dampingFactor={1}
            screenSpacePanning={false}
            maxPolarAngle={debug ? Math.PI * 2 : Math.PI * 0.4}
            minPolarAngle={0}
            mouseButtons={{
                LEFT: THREE.MOUSE.PAN,
                MIDDLE: THREE.MOUSE.DOLLY,
                RIGHT: THREE.MOUSE.ROTATE,
            }}
        />
    )
}
