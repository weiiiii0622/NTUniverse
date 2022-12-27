import React, { useRef, useState, useContext, useEffect } from 'react'
import {
    useGLTF,

} from '@react-three/drei'
import { Object3DProps, useFrame } from '@react-three/fiber'
import { Group, Vector3 } from 'three'
import { useSpring, animated, config } from '@react-spring/three'
import { Button, Modal } from 'antd';
import { useMyContext } from '../../../Utils/useMyContext'
import { Debug, usePlane } from "@react-three/cannon"

import { ThreeContext } from '../../../Containers/THREE/Canvas'


export default function TestInteractiveBlock(props: any) {

    const delta = 0.8;
    const ref = useRef();
    const { bikePosition } = useContext(ThreeContext);
    const [isActive, setIsActive] = useState(false);

    // overlap transition
    const { scale } = useSpring({ 
        scale: isActive ? 1.2 : 1 ,
        
        config: {
            tension: 250,
            friction: 18,
            mass: 3,
            clamp: true,
        }
        
    });
    
    // check overlap
    useFrame(() => {
        //console.log(bikePosition);
        //console.log(isActive);
        handleOverLap(props);
    })

    // useEffect(() => {
    //     if(isActive===true){
    //         console.log(ref.current.position)
    //         ref.current.position.y += 1;
    //     }
    //     else{
    //         console.log(ref.current.position)
    //         ref.current.position.y = props.position[1];
    //     }
    // }, [isActive])

    // determine if overlapped
    const handleOverLap = ({ args, position }) => {
        //console.log(`x: ${bikePosition[0]} / ${Math.abs(position[0])+Math.abs(args[0])}`);
        //console.log(`z: ${bikePosition[2]} / ${Math.abs(position[2])+Math.abs(args[2])}`);
        if(bikePosition[0]<= delta*(Math.abs(position[0])+Math.abs(args[0])) && bikePosition[0]>= delta*(Math.abs(position[0])-Math.abs(args[0])) && bikePosition[2]<= delta*(Math.abs(position[2])+Math.abs(args[2])) && bikePosition[2]>=delta*(Math.abs(position[2])-Math.abs(args[2]))){
            setIsActive(true);
        }
        else{
            setIsActive(false);
        }
    }

    return (
        //<Debug>
            <group {...props} dispose={null}>
                <mesh
                    // @ts-ignore
                    receiveShadow
                    //scale = { swcale }
                >
                    <boxGeometry args={[4,0.5,4]} position={[10, 0, 10]}/>
                    <meshStandardMaterial color={'white'} roughness={1} />
                </mesh>
                <animated.mesh
                    // @ts-ignore
                    ref={ref}
                    receiveShadow
                    scale = { scale }
                >
                    <boxGeometry {...props} />
                    <meshStandardMaterial color={'#FFC300'} roughness={1} />
                </animated.mesh>
        </group>
        //</Debug>
    )
}