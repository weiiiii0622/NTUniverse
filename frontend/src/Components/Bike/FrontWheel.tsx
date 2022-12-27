import { useSpring, animated, config } from "@react-spring/three";
import { Triplet, useCompoundBody, useCylinder } from "@react-three/cannon";
import { Object3DProps } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { Euler, Object3D, Vector3 } from "three/src/Three";
import ModelFBX from "../models/ModelFBX";

interface IProps {
    objectProps?: Object3DProps & {
        position?: Triplet,
        rotation?: Triplet,
    },
    delta: Triplet,
    angularVelocity: number,
    arcadeDirection: 'front' | 'left' | 'right',
};

export default function FrontWheel({ objectProps, arcadeDirection, angularVelocity, delta }: IProps) {

    const [ref, api] = useCompoundBody(() => ({
        mass: 1,
        type: "Kinematic",
        // material: 'wheel',
        // collisionFilterGroup: 0,
        collisionResponse: false,
        shapes: [{
            type: 'Cylinder',
            rotation: [0, 0, 0],
            args: [0.5, 0.5, 0.5, 16],
        }],
        // ...props
    }));

    const { position, rotation } = objectProps;

    const defaultObjectProps = {
        scale: 0.02,
        position: [-0.03, 0, 0] as Triplet,
    };

    const toSteerRotation = (dir: any) => {
        const sign = (dir === 'left' ? 1 : dir === 'right' ? -1 : 0);
        return [
            - Math.PI * 0.09,
            sign * Math.PI / 4,
            0,
        ];
    }
    const { rotation: steerRotation } = useSpring({
        rotation: toSteerRotation(arcadeDirection),
        config: config.wobbly,
    });

    useFrame(() => {
        api.angularVelocity.set(angularVelocity, 0, 0);
    })

    useEffect(() => {
        // console.log(angularVelocity);
    }, [angularVelocity]);

    return <>
        <group
            position={
                new Vector3(...position).add(new Vector3(...delta)
                    .applyEuler(new Euler(...rotation)))
            }
            rotation={rotation}
        >
            {/* <mesh>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshStandardMaterial color={'red'} />
            </mesh> */}
            <animated.group
                rotation={steerRotation as any}
            >
                <group ref={ref}>
                    <ModelFBX filePath="./resources/models/bike/frontWheel.fbx"
                        objectProps={{
                            ...defaultObjectProps,
                            // position,
                            // rotation,
                        }} />
                </group>
            </animated.group>
        </group >
        {/* <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
            <sphereGeometry />
            <meshBasicMaterial transparent opacity={0.5} />
        </mesh> */}
    </>

}