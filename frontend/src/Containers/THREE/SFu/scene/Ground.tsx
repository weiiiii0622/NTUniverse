// @ts-nocheck

import { useGLTF, useTexture } from "@react-three/drei"
import { modelBase, textureBase } from "./Demo"

export default function Ground() {

    const { nodes: ground } = useGLTF(modelBase + '/ground.glb');
    const groundMaterial = useTexture(textureBase + '/ground_new.jpg',
        (txtr: Texture) => { txtr.flipY = false });

    return <>
        <mesh>
            <mesh
                geometry={ground.ground.geometry}
                position={ground.ground.position}
                scale={ground.ground.scale}
                rotation={ground.ground.rotation}
            >
                <meshBasicMaterial map={groundMaterial} />
            </mesh>
        </mesh>
    </>
}

useGLTF.preload('./resources/SFu/models/ground.glb');