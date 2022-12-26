import { Object3DProps, useLoader } from "@react-three/fiber";
import React from "react";
import { FBXLoader, OBJLoader } from "../../Utils/loaders";

interface IProps {
    filePath: string,
    objectProps: Object3DProps,
};

const ModelOBJ = React.forwardRef((props: IProps, ref) => {
    const { filePath, objectProps } = props;

    const obj = useLoader(
        OBJLoader,
        filePath,
    );

    return <primitive object={obj} ref={ref} {...objectProps} />
})

export default ModelOBJ;