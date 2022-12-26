import { Object3DProps, useLoader } from "@react-three/fiber";
import React, { ForwardedRef, useEffect } from "react";
import { FBXLoader } from "../../Utils/loaders";
import { Mesh } from "three";
import { Object3D } from "three/src/Three";

interface IProps {
    lookAt?: [number, number, number],
    filePath: string,
    objectProps: Object3DProps,
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

    return <primitive object={obj} ref={ref} {...objectProps} />
})

export default ModelFBX;