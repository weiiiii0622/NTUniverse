import { Triplet } from "@react-three/cannon";
import { OrbitControls, PerspectiveCamera, Sky, Text3D } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import InteractiveBlock from "../../../Components/THREE/interaction/InteractiveBlock";
import { useMyContext } from "../../../Utils/useMyContext";
import AppSky from "../../../Components/THREE/static/Sky";
import useTeleport from "../../hooks/useTeleport";

const MainLibPosition: Triplet = [300, 0, 300];

export default function MainLib() {

    const { setIsChangeScene, setBikeEnabled, setBikeTpPosition, setLocation, setBulletinModalOpen } = useMyContext();

    const { handleTP } = useTeleport();

    const handleOpenBulletin = ({ location }) => {
        setLocation(location);
        setBikeEnabled(false);
        setBulletinModalOpen(true);
    }

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