import React, { useRef, useState, useContext, useEffect } from 'react'
import {
    useGLTF,

} from '@react-three/drei'
import { Object3DProps, TorusGeometryProps, useFrame } from '@react-three/fiber'
import { Group, Vector3 } from 'three'
import { useSpring, animated, useSpringRef, config } from '@react-spring/three'
import { Button, Modal } from 'antd';
import { useMyContext } from '../../../Utils/useMyContext'
import { Debug, Triplet, usePlane } from "@react-three/cannon"

import { ThreeContext } from '../../../Containers/THREE/Canvas'
import useBikeContext from '../../../Containers/hooks/useBikeContext'


interface IProps {
    position: Triplet,
    handleEvent: () => any,
};

const InteractiveBlock = ({ position, handleEvent }: IProps) => {

    const DEBUG = 0;
    const delta = 0.8;
    const args = [3, 0.2, 3, 4, Math.PI * 2];

    const ref = useRef(null!);
    const { bikePosition } = useBikeContext();
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
            duration: 500,
        },
        loop: true,

        // onRest: () => {
        //     ref.current.position.z = position[1];
        // },
        from: {
            y: position[1],
        },
        to: {
            y: position[1] - 1.5,
        },

    });

    // check overlap
    useFrame(() => {
        //console.log(`${props.position} / ${bikePosition}`);
        //if(DEBUG) console.log(`id: ${props.id} isActive: ${isActive}`);
        handleOverLap();
    })

    const handleOverLap = () => {
        //console.log(bikePosition);
        //console.log(position);
        //console.log(`dis_x: ${position[0]}`);
        //console.log(`dis_z: ${bikePosition[0]}`);

        const dis_x = Math.abs(bikePosition[0] - position[0]);
        const dis_z = Math.abs(bikePosition[2] - position[2]);

        const dist =  Math.sqrt( dis_x*dis_x + dis_z*dis_z );
        //// console.log(`${dist} / ${args[0]}`);
        if(dist <= delta * args[0]){
            api.start();
            setIsActive(true);
        }
        else {
            setIsActive(false);
            api.stop();
        }
    }

    // Handle Event on keyboard 'Enter'
    const useKeyPress = (target, event) => {
        useEffect(() => {
            const downHandler = ({ key }) => target.indexOf(key) !== -1 && event(true)
            const upHandler = ({ key }) => target.indexOf(key) !== -1 && event(false)
            window.addEventListener('keydown', downHandler)
            window.addEventListener('keyup', upHandler)
            return () => {
                window.removeEventListener('keydown', downHandler)
                window.removeEventListener('keyup', upHandler)
            }
        }, [])
    }

    const [isEvent, setIsEvent] = useState(false);
    useKeyPress(['Enter', 'e'], (pressed) => (setIsEvent(pressed)))

    useEffect(() => {
        if (isActive && isEvent) { handleEvent(); }
    }, [isEvent])

    return (
        //<Debug>
        <group position={position} rotation={[Math.PI / 2, 0, Math.PI / 4]} dispose={null}>
            <animated.mesh
                // @ts-ignore
                ref={ref}
                receiveShadow
                position-z={y}
            //scale = { scale }
            >
                <torusGeometry args={args as any} />
                <meshStandardMaterial color={'white'} roughness={10} />
            </animated.mesh>
        </group>
        //</Debug>
    )
}

export default InteractiveBlock;
