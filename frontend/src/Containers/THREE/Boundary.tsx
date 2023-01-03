import { useSphere } from "@react-three/cannon";

export default function Boundary() {
    const [ref, api] = useSphere(() => ({
        type: 'Static',
        args: [28],
        // onCollision: () => { console.log('bump!') },
        onCollide: () => { console.log('bump!'); },
        collisionResponse: true,
        collisionFilterGroup: 0,
    }));

    return <>
        <mesh ref={ref as any}>
            <sphereGeometry />
            <meshBasicMaterial />
        </mesh>
    </>
}