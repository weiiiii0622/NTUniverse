import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { V } from "@use-gesture/core/dist/declarations/src/utils/maths";
import { useContext, useEffect, useRef } from "react";

import * as THREE from 'three';
import { ThreeContext } from "../../../Containers/THREE/Canvas";
import { useMyContext } from "../../../Utils/useMyContext";

const debug = true;

export default function AppOrbitControls({ enabled }) {

    const ref = useRef<any>();

    const { bikePosition } = useContext(ThreeContext);

    useEffect(() => {
        if (enabled && ref.current) {
            ref.current.target.set(...bikePosition);
        }
    }, [enabled]);

    return (
        <>
            {enabled &&
                <OrbitControls
                    ref={ref}
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
                // target={bikePosition}
                />
            }
        </>

    )
}
