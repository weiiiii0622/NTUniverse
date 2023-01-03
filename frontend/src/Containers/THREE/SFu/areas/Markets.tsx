//@ts-nocheck

import { useGLTF, useTexture } from "@react-three/drei";
import { Texture } from "three";
import { modelBase, textureBase } from "../Demo";

export default function Markets() {
    const { nodes: markets } = useGLTF(modelBase + '/markets.glb');
    const marketsMaterial = useTexture(textureBase + '/markets.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    const { nodes: barrels } = useGLTF(modelBase + '/barrels.glb');
    const barrelsMaterial = useTexture(textureBase + '/barrels.jpg',
        (txtr: Texture) => { txtr.flipY = false });


    return <>
        <mesh
            geometry={markets.markets.geometry}
            position={markets.markets.position}
            scale={markets.markets.scale}
            rotation={markets.markets.rotation}
        >
            <meshBasicMaterial map={marketsMaterial} />
        </mesh>

        <mesh
            geometry={barrels.barrels.geometry}
            position={barrels.barrels.position}
            scale={barrels.barrels.scale}
            rotation={barrels.barrels.rotation}
        >
            <meshBasicMaterial map={barrelsMaterial} />
        </mesh>
    </>
}