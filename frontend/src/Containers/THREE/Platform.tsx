import { Triplet, useBox } from "@react-three/cannon";

interface IProps {
    position: Triplet,
};

export default function Platform({ position }: IProps) {
    const [ref, api] = useBox(() => ({
        type: "Static",
        args: [10, 10, 10,],
        position,
        mass: 1000,
        onCollide: () => console.log('ji')
    }));

    return (
        <>
            <mesh ref={ref as any}>
                <boxGeometry />
                <meshBasicMaterial />
            </mesh>
        </>
    )
}