import { Triplet } from "@react-three/cannon";
import { OrbitControls, PerspectiveCamera, Sky, Text3D } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import InteractiveBlock from "../../../Components/THREE/interaction/InteractiveBlock";
import AppSky from "../../../Components/THREE/static/Sky";

const MainLibPosition: Triplet = [300, 0, 300];

export default function MainLib() {

    useFrame(({ camera }) => {
        // console.log(camera.position)
    })

    return (
        <>
            {/* <OrbitControls target={MainLibPosition} /> */}

            {/* <AppSky /> */}

            <group position={MainLibPosition} name="main lib. scene">
                <mesh>
                    <cylinderGeometry args={[10, 10, 0.5, 64]} />
                    <meshStandardMaterial color={'lime'} />
                </mesh>
                <Text3D
                    // size={10}
                    position={[0, 0.5, 0]}
                    // rotation={[-Math.PI / 2, 0, 0]}
                    font={'../node_modules/three/examples/fonts/helvetiker_regular.typeface.json'}
                >
                    main lib.
                    {/* <meshNormalMaterial /> */}
                    <meshStandardMaterial color={'gray'} />
                </Text3D>
            </group>
        </>
    )
}

export { MainLibPosition };