import { Triplet } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import InteractiveBlock from "../../../Components/THREE/interaction/InteractiveBlock";
import useTeleport from "../../../Utils/useEvent";

const MainLibPosition: Triplet = [300, 0, 300];

interface IProps {
    position: Triplet,
};
export default function MainLib({ position }: IProps) {

    const { handleTP } = useTeleport();


    useFrame(() => {
        // console.log(camera.position)
    })

    return (
        <>
            {/* <OrbitControls target={MainLibPosition} /> */}

            {/* <AppSky /> */}

            <group position={position} name="main lib. scene">
                <mesh>
                    <cylinderGeometry args={[10, 10, 0.5, 64]} />
                    <meshStandardMaterial color={'lime'} opacity={1} />
                </mesh>
            </group>
            <InteractiveBlock
                handleEvent={() => {
                    handleTP({
                        location: 'SFu',
                    })
                }}
                position={[300, 0, 300]}
            />
        </>
    )
}

export { MainLibPosition };