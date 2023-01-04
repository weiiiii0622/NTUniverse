// @ts-nocheck

import { useGLTF, useTexture } from "@react-three/drei";
import { Texture } from "three";
import { modelBase, textureBase } from "../Demo";

export default function SignN() {
    const { nodes: signN } = useGLTF(modelBase + '/signN.glb');
    const signsMaterial = useTexture(textureBase + '/main-signs.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    return <>
        <mesh
            geometry={signN.signN.geometry}
            position={signN.signN.position}
            scale={signN.signN.scale}
            rotation={signN.signN.rotation}
        >
            <meshBasicMaterial map={signsMaterial} />
        </mesh>
    </>
}