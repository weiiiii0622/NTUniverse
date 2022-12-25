import { useFBX } from "@react-three/drei";
import { Object3DProps, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh, Object3D } from "three";
import { FBXLoader } from "../../Utils/loaders";

interface IProps {
    lookAt: [number, number, number],
    objectProps: Object3DProps,
};

export default function WhiteDoge(props: IProps) {
    const file = '../../../resources/models/dog/luna-the-lowpoly-dog/source/Unity2Skfb.fbx';
    // const obj = useLoader(FBXLoader, file);
    const obj = useFBX(file);

    const { lookAt, objectProps } = props;
    const ref = useRef<Mesh>();
    if (lookAt) {
    }
    useEffect(() => {
        if (ref.current) {
            console.log(ref.current)
            ref.current.lookAt(...lookAt);
        }
    }, [ref]);

    return <primitive object={obj} ref={ref} {...objectProps} />
}