import { PublicApi, RaycastVehiclePublicApi, useContactMaterial } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { Ref, RefObject, useContext, useEffect, useState } from "react";
import { Object3D } from "three";
import { ObjectProps } from "..";
import useBikeContext from "../../../../Containers/hooks/useBikeContext";
import { ThreeContext } from "../../../../Containers/THREE/Canvas";
import { SetStateType } from "../../../../Utils/type";
import { useMyContext } from "../../../../Utils/useMyContext";
import { ArcadeDirection } from "../Vehicle";
import { IControls } from "./useControls";

/**
 * Dynamics
 */
const steer = 0.5;
const minForce = 500;
const maxForce = 1500;
const maxBrake = 0;   // non-fixable


interface IProps {
	controls: RefObject<IControls>,
	backIndex: number[],
	frontIndex: number[],
	numOfWheels: number,
	api: RaycastVehiclePublicApi,
	chassis: RefObject<Object3D> & {
		current: { api: PublicApi }
	},
	setArcadeDirection: SetStateType<ArcadeDirection>,
	objectProps: ObjectProps,
}

export default function useHandleControls({
	controls, backIndex, frontIndex, numOfWheels,
	api, chassis, setArcadeDirection, objectProps,
}: IProps) {

	/**
	 * Motion:
	 * - control the vehicle based on "controls"
	 */
	const { bikeEnabled, setCameraType, bikeSpeedValue } = useBikeContext();

	const { setBikeControlling } = useContext(ThreeContext);
	useFrame(() => {
		const force = minForce + (maxForce - minForce) * bikeSpeedValue / 100;
		if (!bikeEnabled) {
			chassis.current.api.velocity.set(0, 0, 0);
			chassis.current.api.angularVelocity.set(0, 0, 0);
			setArcadeDirection('front');
			// setCameraType('first');
			backIndex.forEach(i =>
				api.applyEngineForce(0, i))

			frontIndex.forEach(i =>
				api.setSteeringValue(0, i));
			return;
		}

		const controlling = Object.values(controls.current).some(x => x);
		setBikeControlling(controlling);

		const { forward, backward, left, right, brake, reset } = controls.current
		backIndex.forEach(i =>
			api.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, i))

		frontIndex.forEach(i =>
			api.setSteeringValue(left || right ? steer * (left && !right ? 1 : -1) : 0, i));

		if (brake) {
			chassis.current.api.velocity.set(0, 0, 0);
			chassis.current.api.angularVelocity.set(0, 0, 0);
		}

		if (left && !right)
			setArcadeDirection('left');
		else if (right)
			setArcadeDirection('right');
		else
			setArcadeDirection('front');

		if (reset) {
			chassis!.current.api.position.set(...objectProps.position)
			if (objectProps.rotation)
				chassis!.current.api.rotation.set(...objectProps.rotation)
			else
				chassis!.current.api.rotation.set(0, 0, 0)
			chassis!.current.api.velocity.set(0, 0, 0)
			chassis!.current.api.angularVelocity.set(0, 0, 0)
			setCameraType('first');
			backIndex.forEach(i =>
				api.applyEngineForce(0, i))

			frontIndex.forEach(i =>
				api.setSteeringValue(0, i));

		}
	})
}