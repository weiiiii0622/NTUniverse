import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useContext } from "react";

import * as THREE from 'three';

const debug = true;

export default function AppOrbitControls({ enabled }) {
    return (
        <OrbitControls
            enabled={enabled}
            enableDamping
            dampingFactor={0.05}
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
