import { Sky } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useState, useRef, useEffect } from 'react'
import './App.css'
import styled from 'styled-components';
import { AxesHelper, PointLightHelper } from 'three';
import { OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei/core';
import { Debug, Physics, useBox, usePlane } from '@react-three/cannon';
import { DirectionalLightHelper, ObjectLoader, PlaneGeometry } from 'three/src/Three';


// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Box = () => {

	// const ref = useRef<THREE.Mesh>(null!);
	const [ref, api] = useBox(() => ({
		args: [2, 3, 2],
		mass: 1,
		position: [0, 10, 0],
		rotation: [0.1, 0.2, 0.3],
	}));

	useEffect(() => api.angularVelocity.set(1, 0, 1));

	return (
		// @ts-ignore
		<mesh ref={ref} receiveShadow castShadow>
			<boxGeometry args={[2, 3, 2]} />
			<meshStandardMaterial color={'hotpink'} roughness={0.4} />
		</mesh>
	)
}

const Ground = () => {
	const [ref, api] = usePlane(() => ({ type: "Static", rotation: [-Math.PI / 2, 0, 0] }));

	return (
		// @ts-ignore
		<mesh ref={ref} >
			<planeGeometry args={[1000, 1000]} />
			<meshStandardMaterial color={'white'} />
		</mesh>
	)
}

const Lights = () => {
	const ref = useRef<THREE.PointLight>(null!);
	useHelper(ref, PointLightHelper, 1, 'blue');

	return <pointLight ref={ref} args={['white', 0.5]} position={[5, 5, 0]} />
}

const DirLights = () => {
	const ref = useRef<THREE.DirectionalLight>(null!);
	useHelper(ref, DirectionalLightHelper, 1, 'blue');

	return <directionalLight
		ref={ref}
		args={['white', 0.5]}
		position={[15, 15, 0]}
		castShadow
	/>
}


const Bike = () => {
	const gltf = useLoader(GLTFLoader, '../models/bike/scene.gltf');

	const [ref, api] = useBox(() => ({
		mass: 1,
		args: [4.3, 2.5, 0],
		position: [0, 10, -20]
	}));

	const handleClick = () => {
		api.applyLocalImpulse([1, 0, 0], [0, 0, 0]);
		console.log('1');
	}

	return <primitive object={gltf.scene} ref={ref} onClick={handleClick} />
}

const BusStop = () => {
	const gltf = useLoader(GLTFLoader, '../models/bus_stop/scene.gltf');

	// const [ref, api] = usePlane(() => ({
	// 	type: "Static",
	// 	args: [1000, 1000],
	// 	position: [0, 0, 0]
	// }));

	// const handleClick = () => {
	// 	api.applyLocalImpulse([1, 0, 0], [0, 0, 0]);
	// }

	return <primitive object={gltf.scene} />
}

function App() {

	return (
		<Canvas >
			<axesHelper args={[10]} />
			<gridHelper />
			<ambientLight intensity={0.5} />
			<OrbitControls />
			<PerspectiveCamera
				makeDefault
				position={[5, 20, 15]}
			/>
			{/* <Lights /> */}
			<DirLights />
			<Physics gravity={[0, -9.8, 0]} broadphase="SAP">
				<Debug color={'black'}>
					{/* <Box /> */}
					<Ground />
					<Bike />
				</Debug>
			</Physics>
			<BusStop />
		</Canvas>
	)
}

export default App
