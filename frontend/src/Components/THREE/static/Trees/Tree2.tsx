/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

//@ts-nocheck

import React, { useRef } from 'react'
import {
    useGLTF,

} from '@react-three/drei'
import { Object3DProps } from '@react-three/fiber'


export default function Tree2(props: Object3DProps) {
    const group = useRef()
    const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf')
    return (
        <group ref={group} {...props} dispose={null}>
            <mesh geometry={nodes['tree-spruce'].geometry} material={materials.color_main} />

        </group>
    )
}

useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf')