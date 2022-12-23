import { Sky } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useState, useRef } from 'react'
import './App.css'
import styled from 'styled-components';
import { AxesHelper, PointLightHelper } from 'three';
import { OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei/core';

interface IProps {

};

const Box = () => {

	const ref = useRef<THREE.Mesh>(null!);
	useFrame(() => ref.current!.rotation.y += 0.01)

	return (
		<mesh ref={ref} position={[0, 1, -3]} >
			<boxGeometry args={[5, 2, 2]} />
			<meshStandardMaterial args={[{ color: 'red' }]} />
		</mesh>
	)
}

const Lights = () => {
	const ref = useRef<THREE.PointLight>(null!);
	useHelper(ref, PointLightHelper, 1, 'blue');

	return < pointLight ref={ref} color={'white'} position={[5, 5, 0]} />
}

function App(props: IProps) {

	return (
		<>
			<Canvas >
				<axesHelper args={[10]} />
				<gridHelper />
				<ambientLight color={'grey'} />
				<OrbitControls />
				<PerspectiveCamera
					makeDefault
					position={[5, 10, 10]}
				/>
				<Lights />
				<Box />
			</Canvas>
		</>
	)
}

export default App
