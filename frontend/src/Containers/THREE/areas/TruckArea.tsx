// @ts-nocheck

import { useGLTF, useTexture } from "@react-three/drei";
import { Texture } from "three";
import { modelBase, textureBase } from "../Demo";

export default function TruckArea() {
    const { nodes: lamp } = useGLTF(modelBase + '/lamp.glb');
    const lampMaterial = useTexture(textureBase + '/lamp.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    return <>
        <mesh
            geometry={lamp.lamp.geometry}
            position={lamp.lamp.position}
            scale={lamp.lamp.scale}
            rotation={lamp.lamp.rotation}
        >
            <meshBasicMaterial map={lampMaterial} />
        </mesh>
    </>
}