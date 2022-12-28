import { Debug, usePlane } from "@react-three/cannon"


interface IProps {
    args: [number, number],
    rotation: [number, number, number],
};

export default function Ground(props: any) {

    const [ref, api] = usePlane(() => ({
        type: "Static",
        position: [0, -0.1, 0],
        ...props,
    }))


    return (
        // <Debug>
        <mesh
            // @ts-ignore
            ref={ref}
            receiveShadow
        // position={[0, -1, 0]}
        >
            <planeGeometry {...props} />
            <meshStandardMaterial color={'white'} roughness={0.4} />
        </mesh>
        //</Debug>
    )
}