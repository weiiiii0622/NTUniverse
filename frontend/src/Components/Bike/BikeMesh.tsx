import { PublicApi, Triplet, useBox } from "@react-three/cannon";
import { Object3DProps, ReactThreeFiber } from "@react-three/fiber";
import React, { RefObject } from "react";
import { Mesh, Object3D } from "three";
import ModelFBX from "../models/ModelFBX";


interface BikeMeshProps {
    args: Triplet,
    mass: number,
    position?: Triplet,
    rotation?: Triplet,
}


const BikeMesh = React.forwardRef<any, BikeMeshProps>(
    ({ args, mass, position, rotation }, ref: RefObject<Mesh>) => {
        const [, api] = useBox(() => ({
            mass,
            args,
            position,
            rotation,
            allowSleep: false,
            onCollide: (e: any) => console.log('bonk', e.body.userData),
        }), ref);

        return (
            //@ts-ignore
            // <mesh ref={ref} api={api}>
            //     <boxGeometry args={args} />
            //     <meshStandardMaterial color={'grey'} transparent opacity={0.5} />
            // </mesh>
            <mesh ref={ref} api={api}>
                <ModelFBX
                    filePath="../../resources/models/bike/Bike_FBX/Bike.fbx"
                    objectProps={{ scale: 0.02, position: [0, -1.3, 0], rotation: [0, Math.PI, 0] }}
                />
            </mesh>
        )
    });

export default BikeMesh;