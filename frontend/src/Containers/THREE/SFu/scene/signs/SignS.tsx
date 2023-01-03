// @ts-nocheck

import { useGLTF, useTexture } from "@react-three/drei";
import { Texture } from "three";
import { modelBase, textureBase } from "../Demo";

export default function SignS() {
    const { nodes: signS } = useGLTF(modelBase + '/signS.glb');
    const signsMaterial = useTexture(textureBase + '/main-signs.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    return <>
        <mesh
            geometry={signS.signS.geometry}
            position={signS.signS.position}
            scale={signS.signS.scale}
            rotation={signS.signS.rotation}
        >
            <meshBasicMaterial map={signsMaterial} />
        </mesh>
    </>
}