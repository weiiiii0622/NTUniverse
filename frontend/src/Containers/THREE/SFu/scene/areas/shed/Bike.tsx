// @ts-nocheck

import { useGLTF, useTexture } from "@react-three/drei";
import { Texture } from "three";
import { modelBase, textureBase } from "../../Demo";

export default function Bike() {
    const { nodes: bike } = useGLTF(modelBase + '/bike.glb');
    const signsMaterial = useTexture(textureBase + '/bike.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    return <>
        <mesh
            geometry={bike.bike.geometry}
            position={bike.bike.position}
            scale={bike.bike.scale}
            rotation={bike.bike.rotation}
        >
            <meshBasicMaterial map={signsMaterial} />
        </mesh>
    </>
}