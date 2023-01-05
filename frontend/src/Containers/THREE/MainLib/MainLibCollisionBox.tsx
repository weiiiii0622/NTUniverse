import { useBox } from "@react-three/cannon";
import useLocation from "../../hooks/useLocation";


function Block({ position, rotation, args }) {

    const { location, locationInfos } = useLocation();

    const [ref] = useBox(() => ({
        mass: 0,
        type: "Static",
        position: position.map((x, i) => x + locationInfos[location].position[i]),
        rotation,
        args,
    }));

    return <mesh ref={ref as any} />
}

export default function MainLibCollisionBox() {
    return (
        <>
            <Block position={[-7, 0, 0]} rotation={[0, 0, 0]} args={[1, 10, 35]} />
            <Block position={[107, 0, 0]} rotation={[0, 0, 0]} args={[1, 10, 35]} />
            <Block position={[50, 0, 16]} rotation={[0, Math.PI / 2, 0]} args={[1, 10, 120]} />
            <Block position={[50, 0, -16]} rotation={[0, Math.PI / 2, 0]} args={[1, 10, 120]} />

            <Block position={[3, 0, -13]} rotation={[0, Math.PI / 2, 0]} args={[4, 1.5, 12]} />
            <Block position={[21, 0, -13]} rotation={[0, Math.PI / 2, 0]} args={[4, 1.5, 12]} />
            <Block position={[3, 0, 12]} rotation={[0, Math.PI / 2, 0]} args={[4, 1.5, 12]} />
            <Block position={[21, 0, 12]} rotation={[0, Math.PI / 2, 0]} args={[4, 1.5, 12]} />

            <Block position={[46, 0, 5.5]} rotation={[0, Math.PI / 2, 0]} args={[4, 3.5, 4]} />
            <Block position={[46, 0, -6]} rotation={[0, Math.PI / 2, 0]} args={[4, 3.5, 4]} />

            <Block position={[59, 0, 0]} rotation={[0, Math.PI / 2, 0]} args={[15, 3.5, 29]} />
            <Block position={[97, 0, 0]} rotation={[0, Math.PI / 2, 0]} args={[24, 6.5, 18]} />
            <Block position={[85, 0, 10]} rotation={[0, Math.PI / 2, 0]} args={[1, 6.5, 5]} />
            <Block position={[85, 0, -10.5]} rotation={[0, Math.PI / 2, 0]} args={[1, 6.5, 5]} />

            <Block position={[99, 7, 0]} rotation={[0, Math.PI / 2, 0]} args={[17, 6.5, 5]} />
            <Block position={[95, 7, 0]} rotation={[0, Math.PI / 2, 0]} args={[5, 6.5, 3]} />
            <Block position={[96, 7, 7.5]} rotation={[0, Math.PI / 2, 0]} args={[2, 6.5, 2]} />
            <Block position={[96, 7, -7.5]} rotation={[0, Math.PI / 2, 0]} args={[2, 6.5, 2]} />

            <Block position={[84.85, 0.75, -0.5]} rotation={[0, 0, -Math.PI / 2.8]} args={[2, 8, 18.8]} />


            <mesh position={[85, 0, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial />
            </mesh>

        </>
    )
}