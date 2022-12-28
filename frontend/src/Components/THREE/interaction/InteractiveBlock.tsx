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
import { useControls } from '../Bike/hooks/useControls'


const InteractiveBlock = (props: any) => {

    const DEBUG = 0;
    const delta = 0.6;
    const controls = useControls();
    const { navigate } = controls.current;

    const ref = useRef(null!);
    const { bikePosition } = useContext(ThreeContext);
    const [isActive, setIsActive] = useState(false);

    // overlap transition
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
        loop: true,

        onRest: () => {
            ref.current.position.z = props.position[1];
        },
        from: {
            y: props.position[1],
        },
        to: {
            y: props.position[1] - 1.5,
        },

    });
    
    // check overlap
    useFrame(() => {
        //console.log(bikePosition);
        if(DEBUG) console.log(`id: ${props.id} isActive: ${isActive}`);
        handleOverLap(props);
        //console.log(navigate);
        //if(isActive && navigate) console.log(`id: ${props.id}`);
        //console.log(y);
    })

    const handleOverLap = ({ args, position }) => {
        const dis_x = Math.abs(bikePosition[0]-position[0]);
        const dis_z = Math.abs(bikePosition[2]-position[2]);

        const dist = delta * Math.sqrt( dis_x*dis_x + dis_z*dis_z );
        if(dist <= args[0]){
            api.start();
            setIsActive(true);
        }
        else{
            setIsActive(false);
            api.stop();
        }
    }

    // navigation on keyboard 'Enter'
    useEffect(() => {
        console.log("Entered");
        
        if(isActive) alert(`id: ${props.id}`);
    }, [navigate])

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
