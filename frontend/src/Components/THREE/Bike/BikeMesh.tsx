import { Triplet, useBox } from "@react-three/cannon";
import React, { RefObject, useEffect, useRef } from "react";
import { Mesh } from "three";
import ModelFBX from "../models/ModelFBX";
import { useSpring, animated, config } from '@react-spring/three';
import { ArcadeDirection } from "./Vehicle";

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

		const arcadePosition = useRef<Triplet>([0, 0, 0]);
		useEffect(() => {
			return api.position.subscribe((r: Triplet) => arcadePosition.current = r);
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
			</mesh >
		)
	});

export default BikeMesh;