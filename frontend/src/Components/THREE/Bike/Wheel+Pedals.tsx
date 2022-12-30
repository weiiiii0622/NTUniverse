
import { forwardRef } from 'react'
import { CylinderArgs, Triplet, useCompoundBody } from '@react-three/cannon'
import ModelFBX from '../models/ModelFBX';


interface WheelProps {
	mass: number,
	args: CylinderArgs,
	display: 'back' | 'pedal' | 'none',
};

const Wheel = forwardRef<any, WheelProps>(({ mass, args, display }, ref) => {

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
	}), ref);

	const backProps = {
		scale: 0.02,
		position: [0, 0, 0] as Triplet,
	};

	return (
		<>
			{/* @ts-ignore */}
			<group ref={ref} api={api} name={'wheel'}>
				{display == 'back' ?
					<ModelFBX filePath="./resources/models/bike/backWheel.fbx"
						objectProps={{ ...backProps }}
					/>

					: display == 'pedal' ?
						<ModelFBX filePath="./resources/models/bike/pedals.fbx"
							objectProps={{ ...backProps }}
						/>

						: null
				}
			</group >
		</>
	)
})

export default Wheel