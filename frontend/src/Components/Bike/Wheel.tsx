
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
		isBack: boolean
		arcadeDirection: 'left' | 'right' | 'front',
	}>(
		({
			args,
			wheelProps,
			isBack,
			arcadeDirection,
			...props }, ref) => {

			const mass = 10;

			const [, api] = useCompoundBody(() => ({
				mass,
				type: 'Kinematic',
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

			const defaultObjectProps = {
				scale: 0.02,
				position: [0, 0, 0] as Triplet,
			};


			const ver1 = (dir: any) => new Euler(
				-Math.PI * 0.09,
				(dir === 'left' ? 1
					: dir === 'right' ? -1
						: 0) * Math.PI / 4,
				0, "XYZ");

			const ver2 = (dir: any) => new Euler(
				// -Math.PI * 0.09,
				0,
				(dir === 'left' ? 1
					: dir === 'right' ? -1
						: 0) * Math.PI / 4,
				0, "YXZ");

			const ver3 = (dir: any) => {

				return new Euler(
					// -Math.PI * 0.09,
					// 0, 0,
					(dir === 'left' ? 1
						: dir === 'right' ? -1
							: 0) * Math.PI * 0.08,
					0,
					0,
				);
			}

			return (
				// @ts-ignore
				<group ref={ref} api={api}>
					{isBack &&
						<ModelFBX filePath="./resources/models/bike/backWheel.fbx"
							objectProps={{ ...defaultObjectProps }}
						/>}
				</group >
			)
		})

export default Wheel
