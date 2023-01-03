import { Triplet, useBox, useCompoundBody, useHingeConstraint, useLockConstraint, usePointToPointConstraint } from "@react-three/cannon";
import React, { RefObject, useEffect, useRef } from "react";
import { Euler, FrontSide, Mesh, Vector3 } from "three";
import ModelFBX from "../models/ModelFBX";
import { useSpring, animated, config } from '@react-spring/three';
import { ArcadeDirection } from "./Vehicle";
import { Camera, invalidate, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import { IControls } from "./hooks/useControls";
import { useMyContext } from "../../../Utils/useMyContext";
import { type } from "os";



type BikeCameraType = 'default';
interface BikeCameraProps {
	type?: BikeCameraType,
};

function BikeCamera({ type = 'default' }: BikeCameraProps) {

	const positionSet: Record<BikeCameraType, Triplet> = {
		default: [-10, 13, -13]
	}

	return (
		<>
			<PerspectiveCamera
				position={positionSet[type]}
				name="My camera"
				makeDefault
			/>
		</>
	)
}


interface BikeMeshProps {
	args: Triplet,
	mass: number,
	position?: Triplet,
	rotation?: Triplet,

	controls: RefObject<IControls>,
	arcadeDirection: ArcadeDirection,
}

const BikeMesh = React.forwardRef<any, BikeMeshProps>(
	({ args, mass, position, rotation, arcadeDirection, controls }, chassis: RefObject<Mesh>) => {
		const [, api] = useBox(() => ({
			mass,
			args,
			position,
			rotation,
			allowSleep: false,
			// type: 'Static',
			//onCollide: (e: any) => console.log('bonk', e),
			collisionResponse: true,
		}), chassis);



		const { rotation: steerRotation } = useSpring({
			rotation: [
				Math.PI * -0.09,
				Math.PI / 4 * (arcadeDirection === 'left' ? 1
					: arcadeDirection === 'right' ? -1
						: 0),
				0,
			],
			config: config.wobbly,
		})

		const [frontWheel, frontWheelApi] = useCompoundBody(() => ({
			mass: 1,
			type: 'Kinematic',
			material: 'wheel',
			collisionFilterGroup: 0,
			shapes: [{
				type: 'Cylinder',
				rotation: [0, 0, -Math.PI / 2],
				args: [0.66, 0.66, 0.35, 16],
			}],
		}));

		const { camera } = useThree();
		useEffect(() => {
			camera.lookAt(chassis.current.position);
		}, [api, camera]);

		useEffect(() => {
			return api.velocity.subscribe(v => {
				const sign = controls.current.forward ? -1 : 1;
				frontWheelApi.angularVelocity.set(
					Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) * sign / 0.66, 0, 0
				);
			})
		}, [api]);

		return (
			//@ts-ignore
			<mesh ref={chassis} api={api} name="Chassis">

				<ModelFBX filePath="./resources/models/bike/body.fbx"
					objectProps={{
						scale: 0.02,
						position: [0, -0.125 + -args[1] / 2, 0] as Triplet,
					}}
				/>
				<animated.group
					position={[0, 0.48, 1.02,]}
					rotation={steerRotation as any}
				>
					<ModelFBX
						filePath="./resources/models/bike/arcadeNew.fbx"
						objectProps={{
							scale: 0.02,
							position: [0, 0, 0],
						}} />
				</animated.group>

				{/* @ts-ignore */}
				<animated.mesh
					rotation={steerRotation as any}
					position={[0, -0.008 - 0.24, 1.23]}
				>
					<animated.group ref={frontWheel as any}>
						<mesh>
							<ModelFBX filePath="./resources/models/bike/frontWheel.fbx"
								objectProps={{
									scale: 0.02,
									rotation: [0, 0, 0],
								}} />
						</mesh>
					</animated.group>
				</animated.mesh>

				<BikeCamera />
			</mesh>
		)
	});

export default BikeMesh;