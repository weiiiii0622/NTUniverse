import React, { useRef, useState, useContext, useEffect } from 'react'
import {
    useGLTF,

} from '@react-three/drei'
import { Object3DProps, useFrame } from '@react-three/fiber'
import { Group, Vector3 } from 'three'
import { useSpring, animated, useSpringRef, config } from '@react-spring/three'
import { Button, Modal } from 'antd';
import { useMyContext } from '../../../Utils/useMyContext'
import { Debug, usePlane } from "@react-three/cannon"

import { ThreeContext } from '../../../Containers/THREE/Canvas'

const InteractiveBlock = (props: any) => {

    const delta = 0.8;
    const ref = useRef(null!);
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
    
    const api = useSpringRef();
    const { y } = useSpring({
        ref: api,
        config: {
            tension: 250,
            friction: 18,
            mass: 3,
            clamp: true,
            duration: 700,
        },
        // from: {
        //     position: [props.position[0], props.position[1], props.position[2]]
        // },
        // to: {
        //     position: [props.position[0], props.position[1], isActive ? props.position[2] : props.position[2]]
        // },
        y : props.position[1] - 2,
        from: {
            y: props.position[1],
        },
        loop: true,
    });
    
    // check overlap
    useFrame(() => {
        //console.log(bikePosition);
        //console.log(isActive);
        handleOverLap(props);
        //console.log(y);
    })

    // determine if overlapped
    const handleOverLap = ({ args, position }) => {
        //console.log(`x: ${bikePosition[0]} / ${Math.abs(position[0])+Math.abs(args[0])}`);
        //console.log(`z: ${bikePosition[2]} / ${Math.abs(position[2])+Math.abs(args[2])}`);
        if(bikePosition[0]<= delta*(Math.abs(position[0])+Math.abs(args[0])) && delta*bikePosition[0]>= (Math.abs(position[0])-Math.abs(args[0])) && bikePosition[2]<= delta*(Math.abs(position[2])+Math.abs(args[0])) && delta*bikePosition[2]>=(Math.abs(position[2])-Math.abs(args[0]))){
            api.start();
            setIsActive(true);
        }
        else{
            setIsActive(false);
            api.stop();
            ref.current.position.z = props.position[1];
        }
    }

    return (
        //<Debug>
            <group  position={props.position} rotation={props.rotation} dispose={null}>
                <animated.mesh
                    // @ts-ignore
                    ref={ref}
                    receiveShadow
                    position-z={y}
                    //scale = { scale }
                >
                    <torusGeometry args={props.args} />
                    <meshStandardMaterial color={'#FFC300'} roughness={1} />
                </animated.mesh>
        </group>
        //</Debug>
    )
}

export default InteractiveBlock;