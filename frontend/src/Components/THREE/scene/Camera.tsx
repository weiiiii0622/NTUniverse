import { useSpring, animated } from "@react-spring/three";
import { Triplet } from "@react-three/cannon";
import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useContext, useRef, useState } from 'react';
import { Object3D, Vector3 } from "three";
import { ThreeContext } from "../../../Containers/THREE/Canvas";

interface CameraProps {
    orthographic?: boolean,
    track?: boolean,
};

export default function Camera({ orthographic = false, track = false }: CameraProps) {

    // const { bikePosition, bikeControlling } = useContext(ThreeContext);
    // const ref = useRef<Object3D>(null!);
    // const originPosition: Triplet = [15, 8, 3];
    // useFrame(({ camera }) => {
    //     if (track) {
    //         camera.position.set(...originPosition.map((x, i) => (x + bikePosition[i])) as Triplet);
    //         // ref.current.lookAt(, 0, 0);
    //     }
    // })

    // return <>
    //     {orthographic
    //         ? <OrthographicCamera
    //             position={originPosition}
    //             makeDefault
    //         />
    //         : <PerspectiveCamera
    //             ref={ref}
    //             makeDefault
    //             position={originPosition}
    //             zoom={0.7}
    //         />
    //     }
    // </>

}