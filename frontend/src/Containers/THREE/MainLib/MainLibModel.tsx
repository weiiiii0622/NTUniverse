//@ts-nocheck

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 ./MainLib.glb --transform
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function MainLibModel(props) {
  const { nodes, materials } = useGLTF('./resources/MainLib-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-56.89, 2.61, 0.2]} rotation={[-Math.PI / 2, 0, 0]} scale={2.63}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[1.5, 0.47, 0.06]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.62}>
            <mesh geometry={nodes.Object_19.geometry} material={materials['Material.032']} position={[-2.78, -2.02, 0.44]} scale={1.24} />
            <mesh geometry={nodes.Object_19001.geometry} material={materials['Material.032']} position={[4.07, -2.02, 0.43]} scale={1.19} />
            <mesh geometry={nodes.Object_19002.geometry} material={materials['Material.032']} position={[-4.38, -0.61, 0.45]} rotation={[0, 0, -1.53]} scale={1.21} />
            <mesh geometry={nodes.Object_19003.geometry} material={materials['Material.032']} position={[5.31, -0.61, 0.38]} rotation={[0, 0, -1.53]} scale={1.23} />
          </group>
        </group>
      </group>
      <mesh geometry={nodes.Plane.geometry} material={materials['floor base']} position={[-2.25, 1.6, -0.39]} scale={0.71} />
      <mesh geometry={nodes.Plane001.geometry} material={materials.grass} position={[-41.06, 1.55, -0.45]} scale={[0.71, 0.41, 0.71]} />
      <mesh geometry={nodes.地板.geometry} material={materials['Material.008']} position={[6.16, 1.49, -15.19]} rotation={[Math.PI, 0, Math.PI]} scale={0.71} />
      <mesh geometry={nodes.Plane003.geometry} material={materials.road} position={[-1.88, 1.6, -0.39]} scale={0.71} />
      <group position={[-88.22, 9.57, -12.97]} rotation={[-Math.PI, 0.59, -Math.PI]} scale={[0.88, 1.17, 0.01]}>
        <mesh geometry={nodes.Cube005.geometry} material={materials.speedlimit60} />
        <mesh geometry={nodes.Cube005_1.geometry} material={materials.Metal} />
        <mesh geometry={nodes.Cube005_2.geometry} material={materials.Metal} />
      </group>
      <mesh geometry={nodes.Cylinder001.geometry} material={materials.Metal} position={[-72.66, 8.82, -1.26]} rotation={[Math.PI / 2, 0, 0]} scale={0.03} />
      <mesh geometry={nodes.Cylinder003.geometry} material={materials.Metal} position={[-72.66, 8.82, -1.26]} rotation={[Math.PI / 2, 0, 0]} scale={0.03} />
      <group position={[3.89, 5.13, 0.47]} rotation={[Math.PI / 2, 0, -2.62]}>
        <mesh geometry={nodes.Cube051.geometry} material={materials['Metal.085']} />
        <mesh geometry={nodes.Cube051_1.geometry} material={materials['BrownDark.053']} />
        <mesh geometry={nodes.Cube051_2.geometry} material={materials['Gold.006']} />
        <mesh geometry={nodes.Cube051_3.geometry} material={materials['Red.039']} />
      </group>
      <mesh geometry={nodes.coin.geometry} material={materials['Gold.006']} position={[1.45, 4.26, -14.58]} rotation={[Math.PI / 2, 0, -1.9]} scale={1.19} />
      <group position={[-97.06, 1.72, -12.72]} rotation={[Math.PI, 0, Math.PI]} scale={[3.58, 2.88, 2.88]}>
        <mesh geometry={nodes.Plane014.geometry} material={materials['Material.014']} />
        <mesh geometry={nodes.Plane014_1.geometry} material={materials['Material.015']} />
        <mesh geometry={nodes.Plane014_2.geometry} material={materials.leaf} />
        <group position={[-0.02, 1.35, -0.09]} scale={[0.79, 1.36, 0.98]}>
          <mesh geometry={nodes.Group_152001.geometry} material={materials['wood.011']} />
          <mesh geometry={nodes.Group_152001_1.geometry} material={materials['leaves.001']} />
        </group>
        <group position={[-1.04, 1.05, 0.09]} scale={[0.68, 1.16, 0.84]}>
          <mesh geometry={nodes.Group_152.geometry} material={materials['wood.011']} />
          <mesh geometry={nodes.Group_152_1.geometry} material={materials['leaves.001']} />
        </group>
        <group position={[1.71, 1.45, -0.71]} scale={[0.88, 1.1, 1.1]}>
          <mesh geometry={nodes.Group_20.geometry} material={materials['leaves.001']} />
          <mesh geometry={nodes.Group_20_1.geometry} material={materials['wood.011']} />
        </group>
      </group>
      <group position={[33.84, 40.37, 182.3]} rotation={[0, 0.79, 0]} scale={0.02}>
        <mesh geometry={nodes.Mesh025.geometry} material={materials['M_01.001']} />
        <mesh geometry={nodes.Mesh025_1.geometry} material={materials['M_02.001']} />
        <mesh geometry={nodes.Mesh025_2.geometry} material={materials['M_03.001']} />
        <mesh geometry={nodes.Mesh025_3.geometry} material={materials['M_04.001']} />
      </group>
      <mesh geometry={nodes.Cube006.geometry} material={materials.strip} position={[-98.18, 1.6, -0.06]} scale={[1, 1, 0.59]} />
      <mesh geometry={nodes.Side_l_Cube003.geometry} material={materials.School} position={[2.25, 5.39, -0.38]} rotation={[Math.PI / 2, 0, Math.PI]} scale={0.78}>
        <mesh geometry={nodes.Air_conditioner001_Cube012.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Air_conditioner002_Cube015.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Air_conditioner_Cube016.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Brick_Cube005.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Columns_Cylinder001.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Cube001_Cube011.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Cube_Cube010.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Cylinder001_Cylinder005.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Cylinder002.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Cylinder002_Cylinder006.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Doors_Cube009.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Pipe001_Cube018.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Pipe002_Cube019.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Pipe_Cube017.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.School_Cube001.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Side_h_Cube000.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Sills_Cube002.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Triangle_Cube.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Windows_biggest_Cube007.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
        <mesh geometry={nodes.Windows_Cube004.geometry} material={materials.School} position={[4.46, -0.18, 0.37]} scale={0.71} />
      </mesh>
      <mesh geometry={nodes.Cube001.geometry} material={materials['Material.001']} position={[-13.44, 3.36, -0.39]} scale={[0.82, 0.44, 0.49]} />
      <mesh geometry={nodes.Cube002.geometry} material={materials['Material.001']} position={[-10.75, 3.16, -10.69]} />
      <mesh geometry={nodes.Cube.geometry} material={materials['Material.001']} position={[-2.17, 1.59, -0.96]} />
      <group position={[-42.21, 1.78, -0.1]} rotation={[Math.PI / 2, 0, 1.19]} scale={0.03}>
        <mesh geometry={nodes.Mesh168.geometry} material={materials.Support} />
        <mesh geometry={nodes.Mesh168_1.geometry} material={materials.Fixation} />
        <mesh geometry={nodes.Mesh168_2.geometry} material={materials['No bicycles']} />
        <mesh geometry={nodes.Mesh168_3.geometry} material={materials.Pole} />
      </group>
    </group>
  )
}