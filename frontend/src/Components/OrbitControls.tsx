import { OrbitControls } from "@react-three/drei";

import * as THREE from 'three';

const debug = true;

export default function AppOrbitControls() {
    return (
        <OrbitControls
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
