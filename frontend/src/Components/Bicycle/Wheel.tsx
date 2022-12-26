
import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { CylinderArgs, useCompoundBody, useCylinder } from '@react-three/cannon'

const Wheel = forwardRef<any, { args: CylinderArgs }>(
  ({ args, ...props }, ref) => {
    useCompoundBody(() => ({
      mass: 10,
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

    return (
      <mesh ref={ref}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.5, 16]} />
          <meshStandardMaterial transparent opacity={0} color={'purple'} />
        </mesh >
      </mesh >
    )
  })

export default Wheel
