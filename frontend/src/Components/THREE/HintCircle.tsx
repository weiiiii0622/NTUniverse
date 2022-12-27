import { useSpring, animated, config } from "@react-spring/three"
import { Triplet } from "@react-three/cannon"
import { RingGeometryProps } from "@react-three/fiber"
import { ObjectProps } from "./Bike"

interface RingElementProps {
    ringPosition: Triplet,
    ringArgs: [inner: number, outer: number, segments: number],
};
function RingElement({ ringArgs, ringPosition }: RingElementProps) {

    const spring = useSpring({
        from: {
            scale: [1, 1, 1],
        },
        to: {
            scale: [0.1, 1, 0.1],
        },
        loop: true,
        config: {
            friction: 20,
            damping: 5,
            duration: 1500,
        },
    })
    // console.log(spring);

    return (
        <animated.mesh
            scale={spring.scale as any}
        ><mesh position={ringPosition} rotation={[-Math.PI / 2, 0, 0,]}>
                <ringGeometry args={ringArgs} />
                <meshStandardMaterial color={'yellow'} transparent opacity={0.5} />
            </mesh>
        </animated.mesh >
    )
}
export { RingElement };


export default function HintCircle(Component: React.FC<any>) {
    return function HintCircledComponent({ }) {



    }
}