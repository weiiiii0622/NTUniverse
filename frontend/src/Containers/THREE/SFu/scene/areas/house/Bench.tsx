// @ts-nocheck

import { useGLTF, useTexture } from "@react-three/drei";
import { Texture } from "three";
import { modelBase, textureBase } from "../../Demo";

export default function Bench() {
    const { nodes: bench } = useGLTF(modelBase + '/bench.glb');
    const benchMaterial = useTexture(textureBase + '/bench.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    return <>
        <mesh
            geometry={bench.bench.geometry}
            position={bench.bench.position}
            scale={bench.bench.scale}
            rotation={bench.bench.rotation}
        >
            <meshBasicMaterial map={benchMaterial} />
        </mesh>
    </>
}