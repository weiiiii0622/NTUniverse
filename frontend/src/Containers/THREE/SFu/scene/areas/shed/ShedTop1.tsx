//@ts-nocheck

import { useGLTF } from "@react-three/drei";
import { modelBase } from "../../Demo";

export default function ShedTop1() {
    const { nodes, materials } = useGLTF(modelBase + '/shedTop1.glb');

    // console.log(materials);

    return <mesh position={[0, 0.05, 0]}>
        <mesh geometry={nodes.shedTop.geometry} material={materials['Material.010']} position={[-19.01, 6.81, -10.66]} rotation={[0.29, 0, 0]} scale={[0.25, 0.33, 0.72]} />
    </mesh>
}