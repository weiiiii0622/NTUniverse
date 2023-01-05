//@ts-nocheck

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.2 board.glb --transform
*/

import React, { useRef, useState } from 'react'
import { useSpring, useSpringRef, animated } from "@react-spring/three";
import { useGLTF } from '@react-three/drei'
import { modelBase } from '../scene/Demo'

import useEvent from '../../../../Utils/useEvent';
import { useMyContext } from '../../../../Utils/useMyContext'
import HintCircle_Pointer from '../../../../Components/THREE/interaction/HintCircle_Pointer';

export default function Board(props) {
  const { setBulletinModalOpen } = useMyContext();
  const { handleOpenBulletin } = useEvent();
  const { nodes, materials } = useGLTF(modelBase + '/board.glb')

  const [isActive, setIsActive] = useState(false);

	/**
	* Scale
	*/
	const { scale, y } = useSpring({
    y: isActive ? 4.88: 4.78,
		scale: isActive ? 0.022 : 0.02,
		config: {
			tension: 250,
			friction: 18,
			mass: 3,
			clamp: true,
		}
	});

	const handleBulletinEnter = (e) => {
    setIsActive(true);
		document.body.style.cursor = 'pointer';
	}

	const handleBulletinLeave = (e) => {
		setIsActive(false);
		document.body.style.cursor = 'auto';
	}

  const handleBulletinModalOpen = (e) => {
    handleOpenBulletin({
      location: "小福廣場",
    })
  }

  return (
    <group {...props} dispose={null}>
      <animated.group 
        position={ [-5.53, y.animation.to, -5.44] }
        rotation={ [Math.PI / 2, 0, 2.29] } 
        scale={ 0.02 } 
        onPointerEnter={handleBulletinEnter}
				onPointerLeave={handleBulletinLeave}
				onClick={handleBulletinModalOpen}
      >
        <mesh geometry={nodes.Mesh018.geometry} material={materials.lambert3} on/>
        <mesh geometry={nodes.Mesh018_1.geometry} material={materials.lambert2} />
        <mesh geometry={nodes.Mesh018_2.geometry} material={materials['Material.011']} />
        <mesh geometry={nodes.Mesh018_3.geometry} material={materials['lambert1.001']} />
      </animated.group>
      <HintCircle_Pointer
            position={[-5.53, 3.3, -5.44]}
            rotation={[0, 0.8, 0]}
            textHeight={3}
            color={'#795C5F'}
            hintText={"點擊打開留言板"}
            isActive={isActive}
      />
    </group>
  )
}

