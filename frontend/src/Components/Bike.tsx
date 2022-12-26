import { Object3DProps, useLoader } from "@react-three/fiber";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import ModelFBX from "./Models/ModelFBX";
import { useRef } from "react";
import { Mesh } from "three";

export default function Bike(props: Object3DProps) {
    // const obj = useLoader(FBXLoader, '../../resources/models/bike/Bike_FBX/Bike.fbx');

    // return <primitive object={obj} {...props} castShadow />

    const ref = useRef<Mesh>(null!);

    return <ModelFBX
        filePath="../../resources/models/bike/Bike_FBX/Bike.fbx"
        objectProps={props}
        ref={ref}
    />
}