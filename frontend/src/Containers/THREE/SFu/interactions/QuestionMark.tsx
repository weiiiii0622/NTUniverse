import { useSpring, animated } from "@react-spring/three";
import { Triplet } from "@react-three/cannon";
import { Center, Html, Text } from "@react-three/drei";
import { Tooltip } from "antd";
import { Euler, Object3D } from "three";

const flipEuler = new Euler(Math.PI / 2, 0, 0, 'YXZ');

interface QuestionMarkProps {
    rotation?: Triplet,
    autoRotate?: boolean,
    position: Triplet,
    color?: string,
    tooltip?: string,
    onClick?: (e: any) => {},
};

export default function QuestionMark({
    rotation,
    position,
    autoRotate,
    tooltip = "",
    color = '#ca9560',
}: QuestionMarkProps) {

    const { angle } = useSpring({
        from: { angle: [0, 0, 0], },
        to: { angle: [0, Math.PI * 2, 0], },
        config: {
            tension: 120,
            friction: 14,
            mass: 2,
        },
        loop: true,
        delay: 100,
    });

    return (
        <group {...{ rotation, position }}>
            <Center>
                <Html
                    center
                    style={{
                        color: 'transparent',
                        fontSize: 10,
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Tooltip title={tooltip}>
                        <div>bufferText</div>
                    </Tooltip>
                </Html>
            </Center>

            <animated.mesh rotation={autoRotate ? (angle as any) : [0, 0, 0]}>
                <mesh
                    scale={0.1}
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    <mesh receiveShadow>
                        <cylinderGeometry args={[2, 2, 0.5, 32]} />
                        <meshStandardMaterial
                            color={color}
                        />
                    </mesh>
                    <Text
                        font="./fonts/burnfont-1.2.otf"
                        fontSize={2}
                        color="#ffefc5"
                        position={[0, 0.265, 0]}
                        textAlign='center'
                        rotation={[Math.PI / 2, Math.PI, 0]}
                        castShadow
                    >
                        ？
                    </Text>
                    <Text
                        font="./fonts/burnfont-1.2.otf"
                        fontSize={2}
                        color="#ffefc5"
                        position={[0, -0.265, 0]}
                        textAlign='center'
                        rotation={flipEuler}
                        castShadow
                    >
                        ？
                    </Text>
                </mesh>
            </animated.mesh>
        </group>
    )
}