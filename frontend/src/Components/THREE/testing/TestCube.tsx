import { animated, config, useSpring } from '@react-spring/three';
import { Object3DProps } from '@react-three/fiber';
import { RefObject, useEffect, useState, useRef } from 'react';
import { Object3D } from 'three';
import { SetStateType } from '../../../Utils/type';

function TestCube(props: Object3DProps & {
    isDragging: boolean, setIsDragging: SetStateType<boolean>,
    setObjects: SetStateType<any[]>,
}) {

    const ref = useRef<any>(null!);
    const { isDragging, setIsDragging, setObjects } = props;

    const [scale, setScale] = useState(1);
    const spring = useSpring({
        scale,
        config: config.stiff,
    });

    useEffect(() => {
        if (!isDragging)
            setScale(() => 1);
    }, [isDragging]);

    useEffect(() => {
        if (ref!.current) {
            setObjects((objects) => [...objects, ref.current]);
        }
    }, [ref]);

    const onHover = () => {
        if (isDragging) {
            setScale(1.05);
        }
    }

    return (
        <>
            {/* @ts-ignore */}
            <animated.mesh
                // @ts-ignore
                ref={ref}
                position={[0, 0, -1.6]}
                scale={spring.scale}
                // @ts-ignore
                // {...(!enableControls ? bind() : null)}
                {...props} castShadow
                onPointerOver={onHover}
                onPointerOut={() => setScale(1)}
            >
                <boxGeometry args={[3, 3, 3]} />
                <meshStandardMaterial color={'grey'} envMapIntensity={10} />
            </animated.mesh>
        </>
    )
};
export default TestCube;