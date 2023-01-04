// @ts-nocheck

import { useSpring, useSpringRef, animated } from "@react-spring/three";
import { useGLTF, useTexture } from "@react-three/drei";
import { useState } from "react";
import { Texture } from "three";
import { useMyContext } from "../../../../../../Utils/useMyContext";
import { modelBase, textureBase } from "../../Demo";

export default function BigTree() {
	const { nodes: bigTree } = useGLTF(modelBase + '/bigTree.glb');
	const bigTreeMaterial = useTexture(textureBase + '/bigTree.jpg',
		(txtr: Texture) => { txtr.flipY = false });

	const { setTutorialModalOpen } = useMyContext();

	/**
	* Scale
	*/
	const [isLarge, setIsLarge] = useState(false);
	const { scale } = useSpring({
		scale: isLarge ? 1.5 : 1,
		config: {
			tension: 250,
			friction: 18,
			mass: 3,
			clamp: true,
		}
	});

	/**
	 * Rotation
	 */
	const api = useSpringRef();
	const { rotation } = useSpring({
		ref: api,
		from: {
			rotation: [0, 0, 0],
		},
		to: {
			rotation: [0, Math.PI * 2, 0],
		},
		loop: true,
		config: {
			tension: 250,
			friction: 18,
			mass: 3,
			duration: 6000,
		},
	});

	const handleTreeEnter = (e) => {
		api.start();
		setIsLarge(true);
		document.body.style.cursor = 'pointer';
	}

	const handleTreeLeave = (e) => {
		setIsLarge(false);
		api.stop();
		document.body.style.cursor = 'auto';

	}

	return <>
		<mesh position={bigTree.bigTree.position}>
			<animated.mesh
				rotation={rotation as any}
				scale={scale}>

				<mesh
					// @ts-ignore
					geometry={bigTree.bigTree.geometry}
					scale={bigTree.bigTree.scale}
					rotation={bigTree.bigTree.rotation}

					onPointerEnter={handleTreeEnter}
					onPointerLeave={handleTreeLeave}
					onClick={setTutorialModalOpen}
				>
					<meshBasicMaterial map={bigTreeMaterial} />
				</mesh>

			</animated.mesh>
		</mesh>
	</>
}