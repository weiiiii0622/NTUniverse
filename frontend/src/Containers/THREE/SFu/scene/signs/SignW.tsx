// @ts-nocheck

import { useGLTF, useTexture } from "@react-three/drei";
import { Texture } from "three";
import { textureBase } from "../Demo";
import { modelBase } from "../Demo";

export default function SignW() {
    const { nodes: signW } = useGLTF(modelBase + '/signW.glb');
    const signsMaterial = useTexture(textureBase + '/main-signs.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    return <>
        <mesh
            geometry={signW.signW.geometry}
            position={signW.signW.position}
            scale={signW.signW.scale}
            rotation={signW.signW.rotation}
        >
            <meshBasicMaterial map={signsMaterial} />
        </mesh>
    </>
}