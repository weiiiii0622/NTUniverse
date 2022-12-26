import { Object3DProps, useLoader } from "@react-three/fiber";
import React, { ForwardedRef, useEffect, useMemo } from "react";
import { FBXLoader } from "../../Utils/loaders";
import { Mesh } from "three";
import { Object3D } from "three/src/Three";
import { PublicApi } from "@react-three/cannon";

interface IProps {
    lookAt?: [number, number, number],
    filePath: string,
    objectProps?: Object3DProps,
    api?: PublicApi,
};

const ModelFBX = React.forwardRef<Mesh, IProps>((props, ref) => {
    const {
        lookAt,
        filePath,
        
        objectProps
    } = props;

    const obj = useLoader(
        FBXLoader,
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

    return <primitive object={obj} ref={ref} {...objectProps} />
})

export default ModelFBX;