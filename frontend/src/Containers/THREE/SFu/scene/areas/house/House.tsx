// @ts-nocheck

import { useGLTF, useTexture } from "@react-three/drei";
import { Texture } from "three";
import { modelBase, textureBase } from "../../Demo";

export default function House() {
    const { nodes: house } = useGLTF(modelBase + '/house.glb');
    const houseMaterial = useTexture(textureBase + '/house.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    return <>
        <mesh
            geometry={house.house.geometry}
            position={house.house.position}
            scale={house.house.scale}
            rotation={house.house.rotation}
        >
            <meshBasicMaterial map={houseMaterial} />
        </mesh>
    </>
}