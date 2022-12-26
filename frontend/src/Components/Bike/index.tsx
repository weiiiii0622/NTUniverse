import { Triplet } from "@react-three/cannon";
import { Object3DProps, ReactThreeFiber } from "@react-three/fiber";
import { Vector3 } from "three";
import Vehicle from "./Vehicle";

interface BikeProps {
    objectProps?: Object3DProps & {
        position?: Triplet,
        rotation?: Triplet,
    },
};

export default function Bike(props: BikeProps) {
    return (
        <Vehicle {...props} />
    )
}

export type { BikeProps };