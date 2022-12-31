import { Triplet, useBox, useCompoundBody, useHingeConstraint, useLockConstraint, usePointToPointConstraint } from "@react-three/cannon";
import React, { RefObject, useEffect, useRef } from "react";
import { Euler, FrontSide, Mesh, Vector3 } from "three";
import ModelFBX from "../models/ModelFBX";
import { useSpring, animated, config } from '@react-spring/three';
import { ArcadeDirection } from "./Vehicle";
import { Camera, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";

interface BikeMeshProps {
	args: Triplet,
	mass: number,
	position?: Triplet,
	rotation?: Triplet,
	// left?: boolean,
	// right?: boolean,
	arcadeDirection: ArcadeDirection,
}

const BikeMesh = React.forwardRef<any, BikeMeshProps>(
	({ args, mass, position, rotation, arcadeDirection }, ref: RefObject<Mesh>) => {
		const [, api] = useBox(() => ({
			mass,
			args,
			position,
			rotation,
			allowSleep: false,
			collisionFilterGroup: 0,
			onCollide: (e: any) => console.log('bonk', e),
		}), ref);

		const delta = -0.125;
		const defaultObjectProps = {
			scale: 0.02,
			position: [0, delta + -args[1] / 2, 0] as Triplet,
			// rotation: [0, Math.PI, 0] as Triplet,
		};

		// const arcadePosition = useRef<Triplet>([0, 0, 0]);
		// useEffect(() => {
		// 	return api.position.subscribe((r: Triplet) => arcadePosition.current = r);
		// }, [api]);

		const rSub = useRef<Triplet>([0, 0, 0]);
		useEffect(() => {
			return api.rotation.subscribe((r: Triplet) => rSub.current = r);
		}, [api]);


		const { scale, rotation: steerRotation } = useSpring({
			scale: 1,
			rotation: [
				Math.PI * -0.09,
				Math.PI / 4 * (arcadeDirection === 'left' ? 1
					: arcadeDirection === 'right' ? -1
						: 0),
				0,
			],
			config: config.wobbly,
		})

		const { x, y, z, Crotation } = useControls({
			x: {
				value: 10,
				step: .5,
			},
			y: {
				value: 12.5,
				step: .5,
			},
			z: {
				value: -4.5,
				step: .5,
			},
			Crotation: {
				value: {
					x: 0,
					y: 0,
					z: 0,
				},
				step: 0.1,
			}
		});

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
			api.velocity.subscribe(r => frontWheelApi.angularVelocity.set(
				Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]), 0, 0
			))
		}, [api]);

		useFrame(({ camera }) => {
			// console.log(camera.position);
		})

		const spring = useSpring({
			rotation: new Euler(-rSub.current[0], -rSub.current[1], -rSub.current[2], "ZYX")
		});

		return (
			//@ts-ignore
			<mesh ref={ref} api={api}>

				<ModelFBX filePath="./resources/models/bike/body.fbx"
					objectProps={defaultObjectProps}
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
							// rotation: new Euler(0, Math.PI / 2, 0, "ZYX"),
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

				<animated.mesh {...spring} >
					<PerspectiveCamera
						makeDefault
						position={[x, y, z]}
					/>

				</animated.mesh>
			</mesh>
		)
	});

export default BikeMesh;