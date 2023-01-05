import { WheelInfoOptions } from "@react-three/cannon";
import { Ref, useRef } from "react";
import { Mesh } from "three";

const wheelInfo = {
    directionLocal: [0, -1, 0],
    suspensionStiffness: 30,
    suspensionRestLength: 0.3,
    maxSuspensionForce: 1e5,
    maxSuspensionTravel: 0.3,
    dampingRelaxation: 10,
    dampingCompression: 4.4,
    axleLocal: [-1, 0, 0],
    chassisConnectionPointLocal: [1, 0, 1],
    useCustomSlidingRotationalSpeed: true,
    customSlidingRotationalSpeed: -30,
    frictionSlip: 5,
    rollInfluence: 0.01,

}

interface IWheelPosition {
    radius: number,
    front: number,
    back: number,
    width: number,
    height: number,
};

interface IProps {
    numOfWheels: number,
    wheelPosition: IWheelPosition,
};

export default function useWheels(props: IProps): [Ref<Mesh>[], WheelInfoOptions[]] {

    const { numOfWheels,
        wheelPosition: { radius, front, back, width, height },
    } = props;

    const wheelRefs = Array.from({ length: numOfWheels }, (_, __) => useRef<Mesh>());

    const wheelInfosUtils = [
        { radius: 0.67, isFrontWheel: true, chassisConnectionPointLocal: [width / 2, height - 0.001, front] },
        { radius: 0.67, isFrontWheel: true, chassisConnectionPointLocal: [-width / 2, height - 0.001, front] },

        // Pedals
        { radius: 0.68, isFrontWheel: false, chassisConnectionPointLocal: [0, height - 0.001, -0.15] },
        { radius: 0.75, isFrontWheel: false, chassisConnectionPointLocal: [width / 2, height - 0.002, back] },
        {  radius: 0.75,isFrontWheel: false, chassisConnectionPointLocal: [0, height - 0.002, back] },
        {  radius: 0.75,isFrontWheel: false, chassisConnectionPointLocal: [-width / 2, height - 0.002, back] },
    ]
    const wheelInfos = wheelInfosUtils.map(info => ({
        // radius,
        ...wheelInfo,
        ...info,
    }))

    return [wheelRefs, wheelInfos as WheelInfoOptions[]];
}