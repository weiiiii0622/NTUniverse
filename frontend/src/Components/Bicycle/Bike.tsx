import { PublicApi, Triplet, useBox } from "@react-three/cannon";
import { Object3DProps, ReactThreeFiber } from "@react-three/fiber";
import React, { RefObject } from "react";
import { Mesh, Object3D } from "three";


const Bike = React.forwardRef<any, { args: Triplet, mass: number, position: Triplet }>(
    ({ args, mass, position }, ref: RefObject<Mesh>) => {
        const [, api] = useBox(() => ({
            mass,
            args,
            position,
            allowSleep: false,
            onCollide: (e: any) => console.log('bonk', e.body.userData),
        }), ref);

        return (
            //@ts-ignore
            <mesh ref={ref} api={api}>
                <boxGeometry args={args} />
                <meshStandardMaterial color={'grey'} transparent opacity={0.5} />
            </mesh>
        )
    });

export default Bike;