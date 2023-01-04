import { Quad, Triplet, useBox, useCompoundBody } from "@react-three/cannon";
import React, { RefObject, useContext, useEffect, useState } from "react";
import { Mesh, Quaternion, Vector3 } from "three";
import ModelFBX from "../models/ModelFBX";
import { useSpring, animated, config } from '@react-spring/three';
import { ArcadeDirection } from "./Vehicle";
import { Euler, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { IControls } from "./hooks/useControls";
import { ThreeContext } from "../../../Containers/THREE/Canvas";
import { useControls } from "leva";
import { SetStateType } from "../../../Utils/type";
import AppOrbitControls from "../scene/OrbitControls";
import useBikeContext, { BikeCameraType } from "../../../Containers/hooks/useBikeContext";
import BikeCamera from "./BikeCamera";


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
			collisionResponse: true,
		}), chassis);

		const { enableControls } = useContext(ThreeContext);
		const { camera } = useThree();
		// useEffect(() => {
		// 	if (!enableControls) {
		// 		camera.position.set(
		// 			chassis.current.position[0] + bikeCamPositions['default'][0],
		// 			chassis.current.position[1] + bikeCamPositions['default'][1],
		// 			chassis.current.position[2] + bikeCamPositions['default'][2],
		// 		);
		// 		camera.lookAt(chassis.current.position);
		// 	}
		// }, [enableControls]);


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

		useEffect(() => {
			return api.velocity.subscribe(v => {
				const sign = controls.current.forward ? -1 : 1;
				frontWheelApi.angularVelocity.set(
					Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) * sign / 0.66, 0, 0
				);
			})
		}, [api]);

		const [bikeRotation, setBikeRotation] = useState<Quad>([0, 0, 0, 0]);
		useEffect(() => {
			return api.quaternion.subscribe(q => {
				setBikeRotation(q);
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

				<BikeCamera {...{ bikeRotation }} />
			</mesh>
		)
	});

export default BikeMesh;