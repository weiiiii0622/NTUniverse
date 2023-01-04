// @ts-nocheck

import { useGLTF, useTexture } from "@react-three/drei";
import { Texture } from "three";
import { modelBase, textureBase } from "../Demo";


export default function SignE() {
    const { nodes: signE } = useGLTF(modelBase + '/signE.glb');
    const signsMaterial = useTexture(textureBase + '/main-signs.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    return <>
        <mesh
            geometry={signE.signE.geometry}
            position={signE.signE.position}
            scale={signE.signE.scale}
            rotation={signE.signE.rotation}
        >
            <meshBasicMaterial map={signsMaterial} />
        </mesh>
    </>
}