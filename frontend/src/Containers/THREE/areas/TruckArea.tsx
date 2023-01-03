// @ts-nocheck

import { useSpring, animated, config, useChain, useSpringRef } from "@react-spring/three";
import { useGLTF, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { Texture } from "three";
import ModelFBX from "../../../Components/THREE/models/ModelFBX";
import { modelBase, textureBase } from "../Demo";

export default function TruckArea() {
    const { nodes: lamp } = useGLTF(modelBase + '/lamp.glb');
    const lampMaterial = useTexture(textureBase + '/lamp.jpg',
        (txtr: Texture) => { txtr.flipY = false });
    const { nodes: truck } = useGLTF(modelBase + '/truck.glb');
    const truckMaterial = useTexture(textureBase + '/truck-combined.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    const { x, y, deg } = useControls('truck', {
        x: { value: -7, step: 0.5 },
        y: { value: 2, step: 0.5 },
        deg: { value: 1.55, step: 0.05 },
    })
    // const moveApi = useSpringRef();
    // const { position, rotation } = useSpring({
    //     // ref: moveApi,
    //     from: {
    //         position: [4.5, 0, -6.5],
    //         rotation: [0, -0.65, 0],
    //     },
    //     to: [
    //         {
    //             position: [-3.2, 0, -6.5],
    //             // rotation: [0, -0.65, 0],
    //         },
    //         {
    //             position: [-3.2, 0, 0],
    //             // rotation: [0, -0.65, 0],
    //         },
    //         {
    //             position: [4.5, 0, -6.5],
    //             // rotation: [0, -0.65, 0],
    //         },
    //     ],
    //     // config: config.slow,
    //     config: {
    //         // friction: 0,
    //         // tension: 0,
    //         clamp: true,
    //         duration: 3000,
    //     },
    //     loop: true,
    // });
    // moveApi.start();

    const spring = useSpring({
        from: {
            rotation: [0, 1.55, 0],
        },
        to: {
            rotation: [0, 1.55 + Math.PI * 2, 0],
        },
        config: {
            duration: 7000,
            friction: 50,
        },
        loop: true,
    });

    return <>
        <mesh
            geometry={lamp.lamp.geometry}
            position={lamp.lamp.position}
            scale={lamp.lamp.scale}
            rotation={lamp.lamp.rotation}
        >
            <meshBasicMaterial map={lampMaterial} />
        </mesh>

        <animated.mesh
            position={[0.5, 0, -0.5]}
        >
            <animated.mesh
                position={truck.Text001.position}
                // rotation={truck.Text001.rotation}
                {...spring}
                // rotation={[0, deg, 0]}
                scale={0.9}
            >
                <mesh
                    position={[x, 0, y]}

                    geometry={truck.Text001.geometry}
                    scale={truck.Text001.scale}
                >
                    <meshBasicMaterial map={truckMaterial} />
                </mesh>

            </animated.mesh>
        </animated.mesh>
    </>
}