import { Object3DProps, useLoader } from "@react-three/fiber";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export default function Bike(props: Object3DProps) {
    const obj = useLoader(FBXLoader, '../../resources/models/bike/Bike_FBX/Bike.fbx');

    return <primitive object={obj} {...props} castShadow />
}