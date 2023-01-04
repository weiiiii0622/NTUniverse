// @ts-nocheck

import { useGLTF, useTexture } from "@react-three/drei";
import { Texture } from "three";
import { modelBase, textureBase } from "../../Demo";

export default function BigTree() {
    const { nodes: bigTree } = useGLTF(modelBase + '/bigTree.glb');
    const bigTreeMaterial = useTexture(textureBase + '/bigTree.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    return <>
        <mesh
            geometry={bigTree.bigTree.geometry}
            position={bigTree.bigTree.position}
            scale={bigTree.bigTree.scale}
            rotation={bigTree.bigTree.rotation}
        >
            <meshBasicMaterial map={bigTreeMaterial} />
        </mesh>
    </>
}