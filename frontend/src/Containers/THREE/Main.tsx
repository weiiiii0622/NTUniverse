//@ts-nocheck

import { useGLTF, useTexture } from "@react-three/drei"
import { useEffect } from 'react';
import SignE from "./signs/SignE";
import SignN from "./signs/SignN";
import SignS from "./signs/SignS";
import SignW from "./signs/SignW";
import { modelBase, textureBase } from "./Demo";


/**
 * Main
 * 
 * - signs
 * - trees
 * - platforms
 * - stairs 
 */

export default function Main() {

    // const { nodes: signs } = useGLTF('./resources/main-signs.glb');
    // const signsMaterial = useTexture('./resources/main-signs.jpg',
    //     (txtr: Texture) => { txtr.flipY = false });

    const { nodes: trees } = useGLTF(modelBase + '/main-trees.glb');
    const treesMaterial = useTexture(textureBase + '/main-trees.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    const { nodes: platforms } = useGLTF(modelBase + '/main-platforms.glb');
    const platformsMaterial = useTexture(textureBase + '/main-platforms.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    const { nodes: stairsEW } = useGLTF(modelBase + '/stairs-EW.glb');
    const stairsEWMaterial = useTexture(textureBase + '/stairs-EW.png',
        (txtr: Texture) => { txtr.flipY = false });
    const { nodes: stairsNS } = useGLTF(modelBase + '/stairs-NS.glb');
    const stairsNSMaterial = useTexture(textureBase + '/stairs-NS.png',
        (txtr: Texture) => { txtr.flipY = false });

    const { nodes: others } = useGLTF(modelBase + '/main-others.glb');
    const othersMaterial = useTexture(textureBase + '/main-others.jpg',
        (txtr: Texture) => { txtr.flipY = false });


    return (
        <>
            <SignE />
            <SignN />
            <SignS />
            <SignW />

            <mesh
                geometry={trees.trees.geometry}
                position={trees.trees.position}
                scale={trees.trees.scale}
                rotation={trees.trees.rotation}
            >
                <meshBasicMaterial map={treesMaterial} />
            </mesh>
            <mesh
                geometry={platforms.platforms.geometry}
                position={platforms.platforms.position}
                scale={platforms.platforms.scale}
                rotation={platforms.platforms.rotation}
            >
                <meshBasicMaterial map={platformsMaterial} />
            </mesh>
            <mesh
                geometry={stairsEW['stairs-EW'].geometry}
                position={stairsEW['stairs-EW'].position}
                scale={stairsEW['stairs-EW'].scale}
                rotation={stairsEW['stairs-EW'].rotation}
            >
                <meshBasicMaterial map={stairsEWMaterial} />
            </mesh>
            <mesh
                geometry={stairsNS['stairs-NS'].geometry}
                position={stairsNS['stairs-NS'].position}
                scale={stairsNS['stairs-NS'].scale}
                rotation={stairsNS['stairs-NS'].rotation}
            >
                <meshBasicMaterial map={stairsNSMaterial} />
            </mesh>
            <mesh
                geometry={others.menhir_petit005.geometry}
                position={others.menhir_petit005.position}
                scale={others.menhir_petit005.scale}
                rotation={others.menhir_petit005.rotation}
            >
                <meshBasicMaterial map={othersMaterial} />
            </mesh>
        </>
    )
}