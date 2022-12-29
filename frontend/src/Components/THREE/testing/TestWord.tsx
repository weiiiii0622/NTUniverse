import { useSpring, animated, useSpringRef } from '@react-spring/three';
import { Triplet } from '@react-three/cannon';
import { Html, Text } from '@react-three/drei';
import { Object3DProps, useFrame, useThree } from '@react-three/fiber';
import { useDrag, useGesture } from '@use-gesture/react';
import { RefObject, useContext, useEffect, useMemo, useState } from 'react';
import { Mesh, Plane, Ray, Raycaster, Vector3 } from 'three';
import { ThreeContext } from '../../../Containers/THREE/Canvas';
import { SetStateType } from '../../../Utils/type';



export default function TestWord(props: Object3DProps & {
    isDragging: boolean, setIsDragging: SetStateType<boolean>,
    objects: any[],
}) {

    const { isDragging, setIsDragging, objects } = props;
    const { enableControls } = useContext(ThreeContext);

    const [hover, setHover] = useState(false);
    useEffect(() => {
        document.body.style.cursor = hover ? 'pointer' : 'auto';
    }, [hover]);
    // useFrame(() => {
    //     console.log(hover);
    // })

    const originZ = 0;
    const plane = useMemo(() => {
        return new Plane(new Vector3(0, 0, 1), 0);
    }, []);
    const planeIntersectPoint = useMemo(() => {
        return new Vector3();
    }, []);
    const raycaster = useMemo(() => {
        return new Raycaster();
    }, []);
    const [pos, setPos] = useState<Triplet>([0, 3, originZ]);

    const api = useSpringRef();
    const { position } = useSpring({
        // color: 
        position: pos,
        config: {
            mass: 1,
            friction: 10,
            damping: 3,
            // frequency: 3,
        },
        immediate: (!isDragging),
        delay: (isDragging ? 0 : 70),
        // ref: api,
    });


    const { scene } = useThree();
    const bind = useGesture({
        onDrag: ({ active, timeStamp, event, }: any) => {
            if (active) {
                event.ray.intersectPlane(plane, planeIntersectPoint);
                // @ts-ignore
                setPos(() => [planeIntersectPoint.x, planeIntersectPoint.y, originZ]);
            }
            // api.start({ position: pos });
            setIsDragging(active);
            return timeStamp;
        },
        onDragEnd: (({ event }) => {
            //@ts-ignore
            const { ray } = event as { ray: Ray };
            raycaster.set(ray.origin, ray.direction);
            //@ts-ignore
            const intersect = raycaster.intersectObjects(objects);
            if (intersect.length) {
                setPos(() => [intersect[0].object.position.x, intersect[0].object.position.y, originZ]);
                // api.start({ position: pos });
            }
        })
    }, {
        drag: {
            filterTaps: true,
        },
    });

    return (
        <>
            {/* @ts-ignore */}
            <animated.group
                position={position}
                // @ts-ignore
                {...(!enableControls ? bind() : null)}
                {...props} castShadow
                onPointerOver={() => setHover(() => true)}
                onPointerOut={() => setHover(() => false)}
            >
                <Text
                    color={'#EC2D2D'}
                    fontSize={1}
                    maxWidth={200}
                    lineHeight={1}
                    letterSpacing={0.02}
                    font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                    anchorX="center"
                    anchorY="middle"
                    // outLi
                    outlineOffsetX={'0'}
                    outlineOffsetY={'0'}
                    outlineBlur={'7.5%'}
                    // outlineWidth={0.0005}
                    outlineOpacity={0.4}
                    outlineColor="#EC2D2D"
                >
                    123
                </Text>
                {/* <mesh>
                    <boxGeometry args={[3, 3, 3]} />
                    <meshStandardMaterial color={'brown'} envMapIntensity={10}
                        transparent opacity={0.5} />
                </mesh> */}

            </animated.group>
            {/* @ts-ignore */}
        </>
    )
}