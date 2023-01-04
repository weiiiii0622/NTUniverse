import { Triplet } from "@react-three/cannon";
import { PositionPoint } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { SetStateType } from "../../../../Utils/type";
import useBikeContext from "../../../hooks/useBikeContext";
import { animated, useSpring } from '@react-spring/three';
import { useControls } from "leva";
import { RingGeometry } from "three";

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

export default function HintCircle({
    keys = ['Enter', 'e'],
    hintText = '按下 Enter 或 e 鍵以前往地點🧭',
    radius = 4,
    position,
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
    const [spring, api] = useSpring(() => ({}));

    // check overlap
    const { bikePosition } = useBikeContext();
    const delta = 0.8;
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
        r: 3,
        d: 0.7,
    })

    return (
        <group
            position={position}>
            <animated.mesh
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <ringGeometry
                    args={[r, r - d, 32, 8]}
                />
                <meshStandardMaterial
                    color={'#ffffff'}
                    transparent
                    opacity={0.7}
                />
            </animated.mesh>
        </group>
    )
}