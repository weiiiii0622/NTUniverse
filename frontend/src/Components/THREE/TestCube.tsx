import { useSpring, animated, config } from '@react-spring/three';
import { useEffect } from 'react';

export default function TestCube() {
    const [springs, api] = useSpring(
        () => ({
            position: [-1, 0, -3], config: {
                mass: 1,
                friction: 10,
                damping: 3,
                // frequency: 3,
            }
        }));
    // console.log(springs.position, api);
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
    })

    return (
        <animated.mesh position={springs.position as any}>
            <boxGeometry />
            <meshStandardMaterial color={'brown'} />
        </animated.mesh>
    )
}