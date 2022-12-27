import { Triplet } from "@react-three/cannon";
import { Object3DProps, ReactThreeFiber } from "@react-three/fiber";
import { Vector3 } from "three";
import Vehicle from "./Vehicle";

interface ObjectProps extends Object3DProps {
    position?: Triplet,
    rotation?: Triplet,
}

interface BikeProps {
    objectProps?: ObjectProps,
};

export default function Bike(props: BikeProps) {
    return (
        <Vehicle {...props} />
    )
}

export type { BikeProps, ObjectProps };