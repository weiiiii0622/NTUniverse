
import { forwardRef, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { CylinderArgs, Triplet, useCompoundBody, useCylinder } from '@react-three/cannon'
import ModelFBX from '../models/ModelFBX';
import { useFrame } from '@react-three/fiber';
import { Euler, Quaternion, Vector3 } from 'three';

const Wheel = forwardRef
	<any, {
		args: CylinderArgs,
		wheelProps: any,
		isBack: boolean,
		isPedals: boolean,
		arcadeDirection: 'left' | 'right' | 'front',
	}>(
		({
			args,
			wheelProps,
			isBack,
			arcadeDirection,
			isPedals,
			...props }, ref) => {

			const mass = 10;

			const [, api] = useCompoundBody(() => ({
				mass,
				type: 'Dynamic',
				material: 'wheel',
				collisionFilterGroup: 0,
				shapes: [{
					type: 'Cylinder',
					rotation: [0, 0, Math.PI / 2],
					args,
				}],
				...props
			}), ref);

			const { width, back, height } = wheelProps;

			const backProps = {
				scale: 0.02,
				position: [0, 0, 0] as Triplet,
			};

			return (
				<>
					{/* @ts-ignore*/}
					<group ref={ref} api={api}>
						{isBack &&
							<ModelFBX filePath="./resources/models/bike/backWheel.fbx"
								objectProps={{ ...backProps }}
							/>}
						{isPedals &&
							<ModelFBX filePath="./resources/models/bike/pedals.fbx"
								objectProps={{ ...backProps }}
							/>
						}
					</group >
				</>
			)
		})

export default Wheel
