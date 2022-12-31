import { animated, useSpring } from "@react-spring/three";
import { Triplet } from "@react-three/cannon";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { Camera, Vector3 } from "three";
import { ThreeContext } from "./Canvas";

const angle = new Vector3(15, 8, 3);
const easing = 0.05;
const targetEased = new Vector3();


/**
 * Zoom
 */

const zoomConfig = {
    easing: 0.05,
    min: 10,
    amplitude: 5,
};

let zoomTarget = 0.5;
let zoomValue = 0.5;
let zoomDistance = 0;
window.addEventListener('mousewheel', (e: any) => {
    zoomTarget += e.deltaY * 0.001;
    zoomTarget = Math.max(Math.min((zoomTarget), 1), 0)
});


/**
 * Pan
 */

export default function TestCam() {
    const { bikePosition } = useContext(ThreeContext);

    useFrame(({ camera }) => {
        targetEased.x += (bikePosition[0] - targetEased.x) * easing;
        targetEased.y += (bikePosition[1] - targetEased.y) * easing;
        targetEased.z += (bikePosition[2] - targetEased.z) * easing;

        zoomValue += (zoomTarget - zoomValue) * zoomConfig.easing;
        zoomDistance = zoomConfig.min + zoomConfig.amplitude * zoomValue;

        camera.position.copy(targetEased).add(angle.clone().normalize().multiplyScalar(zoomDistance));
        camera.lookAt(targetEased);
    })


    // const spring = useSpring({
    //     position: bikePosition,
    // });

    return (
        <mesh >
            <PerspectiveCamera
                makeDefault
                position={angle}
            />
            <mesh>
                <planeGeometry args={[500, 500, 1, 1]} />
                <meshBasicMaterial />
            </mesh>
        </mesh>
    )
}