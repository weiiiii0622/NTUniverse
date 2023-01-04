import { Triplet } from "@react-three/cannon";
import { Billboard, Html, PositionPoint, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { SetStateType } from "../../../Utils/type";
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
    position: Triplet,
    rotation: Triplet,
    textHeight?: number,
    keys?: string[],
    hintText?: string,
    radius?: number,
    isActive?: boolean,
    handleEvent?: () => any,
};


export default function HintCircle_Pointer({
    keys = ['Enter', 'e'],
    hintText = '按下 Enter 或 e 鍵以前往地點',
    radius = 7,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    textHeight = 2,
    isActive = false,
    handleEvent,
}: IProps) {
    // Based on "interactiveBlock"

    //const [isActive, setIsActive] = useState(true);
    const [isEvent, setIsEvent] = useState(false);
    useEffect(() => {
        if(isActive){
            api.stop();
        }
        else{
            api.start();
        }
    }, [isActive])

    // animation
    const api = useSpringRef();
    const spring = useSpring({
        from: {
            scale: 0.8,
            opacity: 0.3,
            // position: [0, 0, 0],
        },
        to: {
            scale: 1.2,
            opacity: 0.6,

            // position: [0, 0.5, 0],
        },
        config: {
            duration: 800,
        },
        loop: true,
        ref: api,
    });
    //api.start()
 
    const { r, d } = useControls({
        r: 2.5,
        d: 0.6,
    })

    const textSpring = useSpring({
        rotation: isActive ? [0, 0, 0] : [-Math.PI / 2, 0, 0],
    });

    return (
        <group
            position={position} rotation={rotation}>
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
                    opacity={isActive ? spring.opacity : spring.opacity}
                />
            </animated.mesh>
            {isActive &&

                <animated.mesh
                    position={[0, 0, 1]}
                    //rotation={[Math.PI / 2, 0, 2.29]}
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
                        position={[0, textHeight, 0]}
                        
                    >
                        {hintText}
                    </Text>
                </animated.mesh>
            }
        </group >
    )
}


'./fonts/GenRyuMin-B.ttc'