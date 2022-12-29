import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Obj from "./Obj.js";
import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export default function Appnew() {
    const [isDragging, setIsDragging] = useState(false);
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    return (
        <Canvas style={{ background: "white" }} shadows dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <directionalLight
                intensity={0.5}
                castShadow
                shadow-mapSize-height={512}
                shadow-mapSize-width={512}
            />

            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.1, 0]}
                receiveShadow
            >
                <planeBufferGeometry attach="geometry" args={[10, 10]} receiveShadow />
                <meshPhongMaterial
                    attach="material"
                    color="#ccc"
                    side={THREE.DoubleSide}
                //   receiveShadow
                />
            </mesh>

            <planeHelper args={[floorPlane, 5,]} />

            <gridHelper args={[100, 100]} />

            <Obj setIsDragging={setIsDragging} floorPlane={floorPlane} />

            <OrthographicCamera makeDefault zoom={50} position={[0, 40, 200]} />

            <OrbitControls minZoom={10} maxZoom={50} enabled={!isDragging} />
        </Canvas>
    );
}