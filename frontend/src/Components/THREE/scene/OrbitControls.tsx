import { Triplet } from "@react-three/cannon";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree, } from "@react-three/fiber";
import { V } from "@use-gesture/core/dist/declarations/src/utils/maths";
import { useContext, useEffect, useRef } from "react";

import * as THREE from 'three';
import { Vector3 } from "three";
import useBikeContext from "../../../Containers/hooks/useBikeContext";
import { ThreeContext } from "../../../Containers/THREE/Canvas";
import { useMyContext } from "../../../Utils/useMyContext";

const debug = false;

interface IProps {
    cameraPosition: Vector3,
    enable: boolean,
};

export default function AppOrbitControls({ cameraPosition, enable }: IProps) {

    const ref = useRef<any>();

    const { bikePosition } = useBikeContext();

    const { camera } = useThree();
    useEffect(() => {
        if (ref.current) {
            ref.current.target.set(...bikePosition);
        }
        // console.log('free', camera);

        camera.position.copy(cameraPosition);
        camera.zoom = 1.65;
    }, [camera]);

    return (
        <>
            <OrbitControls
                ref={ref}
                enableDamping
                dampingFactor={0.05}
                screenSpacePanning={false}
                maxPolarAngle={debug ? Math.PI * 2 : Math.PI * 0.4}
                minPolarAngle={0}
                zoomSpeed={0.5}
                maxDistance={100}
                mouseButtons={{
                    LEFT: THREE.MOUSE.PAN,
                    MIDDLE: THREE.MOUSE.DOLLY,
                    RIGHT: THREE.MOUSE.ROTATE,
                }}
            // target={bikePosition}
            />

        </>

    )
}
