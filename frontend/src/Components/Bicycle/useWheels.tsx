import { WheelInfoOptions } from "@react-three/cannon";
import { Ref, useRef } from "react";
import { Mesh } from "three";

const wheelInfo = {
    directionLocal: [0, -1, 0],
    suspensionStiffness: 30,
    suspensionRestLength: 0.3,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    dampingRelaxation: 10,
    dampingCompression: 4.4,
    axleLocal: [-1, 0, 0],
    chassisConnectionPointLocal: [1, 0, 1],
    useCustomSlidingRotationalSpeed: true,
    customSlidingRotationalSpeed: -30,
    frictionSlip: 8,
}

interface IWheelProps {
    radius: number,
    front: number,
    back: number,
    width: number,
    height: number,
};

interface IProps {
    numOfWheels: number,
    wheelProps: IWheelProps,
};

export default function useWheels(props: IProps): [Ref<Mesh>[], WheelInfoOptions[]] {

    const { numOfWheels,
        wheelProps: { radius, front, back, width, height },
    } = props;

    const wheelRefs = Array.from({ length: numOfWheels }, (_, __) => useRef<Mesh>());

    const wheelInfosUtils = [
        { isFrontWheel: true, chassisConnectionPointLocal: [width / 2, height, front] },
        { isFrontWheel: true, chassisConnectionPointLocal: [0, height / 2, front] },
        { isFrontWheel: true, chassisConnectionPointLocal: [-width / 2, height, front] },
        { isFrontWheel: false, chassisConnectionPointLocal: [width / 2, height, back] },
        { isFrontWheel: true, chassisConnectionPointLocal: [0, height / 2, back] },
        { isFrontWheel: false, chassisConnectionPointLocal: [-width / 2, height, back] },
    ]
    const wheelInfos = wheelInfosUtils.map(info => ({
        radius,
        ...wheelInfo,
        ...info,
    }))

    return [wheelRefs, wheelInfos as WheelInfoOptions[]];
}