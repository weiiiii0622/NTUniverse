import { useTexture } from "@react-three/drei";
import { Object3DProps, useLoader } from "@react-three/fiber";
import React, { useMemo } from "react";
import { Mesh } from "three";
import { FBXLoader, OBJLoader } from "../../Utils/loaders";

interface IProps {
    filePath: string,
    texturePath?: string,
    AOPath?: string,
    objectProps: Object3DProps,
};

const ModelOBJ = React.forwardRef((props: IProps, ref) => {
    const { filePath, objectProps, texturePath, AOPath } = props;

    const texture = useTexture(texturePath);
    const AO = useTexture(AOPath);

    const obj = useLoader(
        OBJLoader,
        filePath,
    );

    const geometry = useMemo(() => {
        let g;
        obj.traverse((c) => {
            if (c.type === "Mesh") {
                const _c = c as Mesh;
                g = _c.geometry;
            }
        });
        return g;
    }, [obj]);

    // return <primitive object={obj} ref={ref} {...objectProps} />
    return (
        <mesh geometry={geometry}>
            <meshStandardMaterial map={texture} aoMap={AO} />
        </mesh>
    )
})

export default ModelOBJ;