import { useSpring, animated } from "@react-spring/three";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef } from 'react';

export default function Camera() {

    return <PerspectiveCamera
        makeDefault
        position={[15, 8, 3]}
        // lookAt
    />
}