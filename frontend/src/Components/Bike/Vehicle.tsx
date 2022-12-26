
import React, { useRef } from 'react'
import { Object3DProps, useFrame } from '@react-three/fiber'
import { CylinderArgs, Debug, Triplet, useRaycastVehicle } from '@react-three/cannon'
import { useControls } from './useControls'
import Wheel from './Wheel'
import BikeMesh from './BikeMesh'
import useWheels from './useWheels'
import { Mesh } from 'three'
import { BikeProps } from '.'


/**
 * Wheel info
 */
const defaultWheelProps = {
    radius: 0.7,
    width: 1.2,
    height: -0.4,
    front: 1.3,
    back: -1.15,
    args: [0.7, 0.7, 0.5, 16] as CylinderArgs,
};
const { radius } = defaultWheelProps;

const numOfWheels = 6;
const frontIndex = [0, 1, 2];
const backIndex = [3, 4, 5];

/**
 * Chassis info
 */
const defaultChassisProps = {
    mass: 500,
    args: [1.3, 2, 4] as Triplet,
    // position: [0, 1.5, 0] as Triplet,
};

/**
 * Dynamics
 */
const steer = 0.75;
const force = 1000;
const maxBrake = 1e5;


const justifyPosition = (p: Triplet): Triplet => ([p[0], p[1] + 1.5, p[2]]);

/**
 * Component
 */
interface VehicleProps extends BikeProps {
    // objectProps?: Object3DProps,
};
function Vehicle(props: VehicleProps) {
    const { objectProps } = props;

    const chassis = useRef<any>(null!)
    const [wheelRefs, wheelInfos] = useWheels(
        { numOfWheels, wheelProps: defaultWheelProps });

    /**
     * Physics
     */
    const [vehicle, api] = useRaycastVehicle(() => ({
        chassisBody: chassis,
        wheels: wheelRefs,
        wheelInfos: wheelInfos,
        indexForwardAxis: 2,  // z=2
        indexRightAxis: 0,  // x=0
        indexUpAxis: 1,  // y=1
        // ...objectProps,
    }))

    /**
     * Motion
     */
    const controls = useControls()
    useFrame(() => {
        const { forward, backward, left, right, brake, reset } = controls.current
        backIndex.forEach(i =>
            api.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, i))
        frontIndex.forEach(i =>
            api.setSteeringValue(left || right ? steer * (left && !right ? 1 : -1) : 0, i));
        backIndex.forEach(i =>
            api.setBrake(brake ? maxBrake : 0, i));

        if (reset) {
            console.log(chassis!.current.api);
            chassis!.current.api.position.set(...justifyPosition(objectProps.position))
            chassis!.current.api.rotation.set(...objectProps.rotation)
            chassis!.current.api.velocity.set(0, 0, 0)
            chassis!.current.api.angularVelocity.set(0, 0, 0)
        }
    })

    console.log(objectProps);

    return (
        <Debug>
            <group ref={vehicle}>
                <BikeMesh
                    ref={chassis}
                    position={justifyPosition(objectProps.position)}
                    rotation={objectProps.rotation}
                    {...defaultChassisProps} />
                {
                    wheelRefs.map((ref, i) => (
                        <Wheel key={'wheel' + i} ref={ref} args={defaultWheelProps.args} />
                    ))
                }
            </group >
        </Debug>
    )
}

export default Vehicle
