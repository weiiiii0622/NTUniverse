import { OrbitControls } from "@react-three/drei";

import * as THREE from 'three';

export default function AppOrbitControls() {
    return (
        <OrbitControls
            panSpeed={2.5}
            enableDamping
            dampingFactor={1}
            screenSpacePanning={false}
            maxPolarAngle={Math.PI * 2}
            minPolarAngle={0}
            mouseButtons={{
                LEFT: THREE.MOUSE.PAN,
                MIDDLE: THREE.MOUSE.DOLLY,
                RIGHT: THREE.MOUSE.ROTATE,
            }}
        />
    )
}