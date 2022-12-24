import { usePlane } from "@react-three/cannon"


interface IProps {
    args: [number, number],
    rotation: [number, number, number],
};

export default function Ground(props: IProps) {

    const [ref, api] = usePlane(() => ({
        type: "Static",
        ...props,
    }))


    return (
        // @ts-ignore
        <mesh ref={ref} position={[0, 0, 0]}>
            <planeGeometry {...props}/>
            <meshStandardMaterial color={'white'} roughness={0.4} />
        </mesh>
    )
}