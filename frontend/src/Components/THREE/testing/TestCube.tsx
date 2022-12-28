import { useSpring, animated, config } from '@react-spring/three';
import { Trail } from '@react-three/drei';
import { Object3DProps } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import { Mesh } from 'three';
import Shadow from '../scene/Shadow';

export default function TestCube(props: Object3DProps) {
    const [{ position }, api] = useSpring(
        () => ({
            // from: {
            //     position: [-1, 0, -3],
            // },
            position: [0, 0, 0],
            // reset: true,
            config: {
                mass: 1,
                friction: 10,
                damping: 3,
                // frequency: 3,
            }
        }));
    // console.log(springs.position, api);

    // const { position } = useControls({
    //     position: {
    //         step: 0.1,
    //         value: {
    //             x: 1,
    //             z: 1,
    //         },
    //         // min: {
    //         //     x: 0,
    //         // },
    //     },
    // })

    useEffect(() => {
        window.addEventListener('keypress', (e) => {
            if ((e.key === 'l')) {
                api.start({ position: [2, 2, 2] });
            }
            if (e.key === 'k') {
                api.start({ position: [-1, 0, -1] });
            }
            return;
        })
    }, []);

    return (
        <>
            {/* @ts-ignore */}
            <animated.mesh {...props} position={position} castShadow>
                <boxGeometry args={[3, 3, 3]} />
                <meshStandardMaterial color={'brown'} envMapIntensity={10} />
            </animated.mesh>
        </>
    )
}