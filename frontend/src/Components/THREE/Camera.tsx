import { useSpring, animated } from "@react-spring/three";
import { Triplet } from "@react-three/cannon";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useContext, useRef, useState } from 'react';
import { Object3D, Vector3 } from "three";
import { ThreeContext } from "../../Containers/THREE/Canvas";

export default function Camera() {

    const { bikePosition, bikeControlling } = useContext(ThreeContext);
    const ref = useRef<Object3D>(null!);
    const originPosition: Triplet = [15, 8, 3];
    useFrame(({ camera }) => {
        console.log(camera.position);
        // if (bikeControlling) {
        // camera.position.get();
        camera.position.set(...originPosition.map((x, i) => (x + bikePosition[i])) as Triplet);
        ref.current.lookAt(new Vector3(...bikePosition));
        // }
    })

    return <PerspectiveCamera
        ref={ref}
        makeDefault
        position={originPosition}
        zoom={0.7}
    />
}