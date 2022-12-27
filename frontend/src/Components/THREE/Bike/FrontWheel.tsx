import { useSpring, animated, config } from "@react-spring/three";
import { Triplet, useCompoundBody, useCylinder } from "@react-three/cannon";
import { Object3DProps } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { Euler, Object3D, Vector3 } from "three/src/Three";
import ModelFBX from "../models/ModelFBX";

interface IProps {
	objectProps?: Object3DProps & {
		position?: Triplet,
		rotation?: Triplet,
	},
	delta: Triplet,
	angularVelocity: number,
	arcadeDirection: 'front' | 'left' | 'right',
};

export default function FrontWheel({ objectProps, arcadeDirection, angularVelocity, delta }: IProps) {

	const [ref, api] = useCompoundBody(() => ({
		mass: 1,
		type: "Kinematic",
		// material: 'wheel',
		// collisionFilterGroup: 0,
		collisionResponse: false,
		shapes: [{
			type: 'Cylinder',
			rotation: [0, 0, 0],
			args: [0.1, 0.1, 0.5, 16],
		}],
		// ...props
	}));

	const { position, rotation } = objectProps;

	const defaultObjectProps = {
		scale: 0.02,
		position: [-0.03, 0, 0] as Triplet,
	};

	const toSteerRotation = (dir: any) => {
		const sign = (dir === 'left' ? 1 : dir === 'right' ? -1 : 0);
		return [
			- Math.PI * 0.09,
			sign * Math.PI / 4,
			0,
		];
	}
	const { rotation: steerRotation } = useSpring({
		rotation: toSteerRotation(arcadeDirection),
		config: config.wobbly,
	});

	useFrame(() => {
		api.angularVelocity.set(angularVelocity, 0, 0);
	})


	/**
	 * Render:
	 * - First locate the position of bike
	 * - Then rotate wheel according to steering
	 */

	return <>
		<group
			position={
				new Vector3(...position).add(new Vector3(...delta)
					.applyEuler(new Euler(...rotation)))
			}
			rotation={rotation}
		>
			<animated.group
				rotation={steerRotation as any}
			>
				{/* @ts-ignore */}
				<group ref={ref}>
					<ModelFBX filePath="./resources/models/bike/frontWheel.fbx"
						objectProps={{ ...defaultObjectProps, }} />
				</group>
			</animated.group>
		</group >
	</>

}