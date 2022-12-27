import React, { useRef, useState } from 'react'
import {
    useGLTF,

} from '@react-three/drei'
import { Object3DProps, useFrame } from '@react-three/fiber'
import { Group, Vector3 } from 'three'
import { useSpring, animated, config } from '@react-spring/three'
import { Button, Modal } from 'antd';
import { useMyContext } from '../../../Utils/useMyContext'
import { Debug, usePlane } from "@react-three/cannon"


interface IProps {
    args: [number, number],
    rotation: [number, number, number],
};

export default function TestInteractiveBlock(props: any) {
    const ref = useRef();

    return (
        //<Debug>
            <group ref={ref} {...props} dispose={null}>
                <mesh
                    // @ts-ignore
                    receiveShadow
                    //position={[10, 0, 5]}
                >
                    <boxGeometry {...props} />
                    <meshStandardMaterial color={'blue'} roughness={7} />
                </mesh>
        </group>
        //</Debug>
    )
}