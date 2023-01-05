import { Triplet } from "@react-three/cannon";
import { Billboard, Html, PositionPoint, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import useBikeContext from "../../../Containers/hooks/useBikeContext";
import { animated, config, useSpring, useSpringRef } from '@react-spring/three';
import { useControls } from "leva";
import { RingGeometry } from "three";
import { pick } from "lodash";

const useKeyPress = (
    target: string[],
    event: (e: boolean) => void) => {

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

interface IProps {
    keys?: string[],
    hintText?: string,
    radius?: number,
    position: Triplet,
    handleEvent: () => any,
};


export default function HintCircle_Bike_MainLib({
    keys = ['Enter', 'e'],
    hintText = '按下 Enter 或 e 鍵以返回小福廣場',
    radius = 7,
    position = [0, 0, 0],
    handleEvent,
}: IProps) {
    // Based on "interactiveBlock"

    const [isActive, setIsActive] = useState(false);
    const [isEvent, setIsEvent] = useState(false);

    useFrame(() => { handleOverLap(); })

    // Handle Event on keyboard 'Enter'
    useKeyPress(keys, (pressed) => (setIsEvent(pressed)));
    useEffect(() => {
        if (isActive && isEvent) { handleEvent(); }
    }, [isEvent])


    // animation
    const api = useSpringRef();
    const spring = useSpring({
        from: {
            scale: 1,
            opacity: 0.3,
            // position: [0, 0, 0],
        },
        to: {
            scale: 0.1,
            opacity: 0.9,

            // position: [0, 0.5, 0],
        },
        onRest: {

        },
        config: {
            duration: 1000,
        },
        loop: true,
        ref: api,
    });

    // check overlap
    const { bikePosition } = useBikeContext();
    const delta = 0.35;
    const handleOverLap = () => {

        const dis_x = Math.abs(bikePosition[0] - position[0]);
        const dis_z = Math.abs(bikePosition[2] - position[2]);

        const dist = Math.sqrt(dis_x * dis_x + dis_z * dis_z);
        if (dist <= delta * radius) {
            api.start();
            setIsActive(true);
        }
        else {
            setIsActive(false);
            api.stop();
        }
    }

    const { r, d } = useControls({
        r: 2.5,
        d: 0.6,
    })

    const textSpring = useSpring({
        rotation: isActive ? [0, Math.PI / 2, 0] : [Math.PI / 2, Math.PI / 2, 0],
    });

    return (
        <group
            position={position}>
            <animated.mesh
                rotation={[Math.PI / 2, 0, 0]}
                {...spring as any}
            >
                <ringGeometry
                    args={[r, r - d, 32, 8]}
                />
                <animated.meshBasicMaterial
                    color={'#fffac1'}
                    transparent
                    opacity={isActive ? spring.opacity : 0}
                />
            </animated.mesh>
            {isActive &&

                <animated.mesh
                    position={[0, 1, 0]}
                    // rotation={[-Math.PI / 2, 0, 0]}
                    {...textSpring as any}
                >
                    <Text
                        // color={'#f0e9c2'}
                        outlineOffsetX={'10%'}
                        outlineOffsetY={'10%'}
                        outlineBlur={'10%'}
                        outlineOpacity={0.2}
                        outlineColor={'#313127'}
                        font={'./fonts/GenRyuMin-B.ttc'}
                        fontSize={0.5}
                        // outlineWidth={0.005}
                        position={[0, 1.5, -2]}
                    >
                        {hintText}
                    </Text>
                </animated.mesh>
            }
        </group >
    )
}


'./fonts/GenRyuMin-B.ttc'