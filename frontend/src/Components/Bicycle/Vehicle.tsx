
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { CylinderArgs, Debug, Triplet, useRaycastVehicle } from '@react-three/cannon'
import { useControls } from './useControls'
import Wheel from './Wheel'
import Bike from './Bike'
import useWheels from './useWheels'
import { Mesh } from 'three'

const defaultWheelProps = {
    radius: 0.7,
    width: 1.2,
    height: -0.4,
    front: 1.3,
    back: -1.15,
    args: [0.7, 0.7, 0.5, 16] as CylinderArgs,
};
const { radius } = defaultWheelProps;

const defaultChassisProps = {
    mass: 500,
    args: [1.3, 2, 4] as Triplet,
    position: [0, 3, 0] as Triplet,
};

const numOfWheels = 6;
const frontIndex = [0, 1, 2];
const backIndex = [3, 4, 5];

const steer = 0.75;
const force = 1000;
const maxBrake = 1e5;

const VehicleProps = {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
}

function Vehicle({ ...props }) {
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
        ...VehicleProps,
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
            // console.log(chassis);
            chassis!.current.api.position.set(0, 3, 0)
            chassis!.current.api.velocity.set(0, 0, 0)
            chassis!.current.api.angularVelocity.set(0, 0, 0)
            chassis!.current.api.rotation.set(0, 0, 0)
        }
    })

    return (
        // <Debug>
            <group ref={vehicle}>
                <Bike ref={chassis} {...defaultChassisProps} />
                {
                    wheelRefs.map((ref, i) => (
                        <Wheel key={'wheel' + i} ref={ref} args={defaultWheelProps.args} />
                    ))
                }
            </group >
        // </Debug>
    )
}

export default Vehicle
