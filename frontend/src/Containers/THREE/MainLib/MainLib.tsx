import { Triplet } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import InteractiveBlock from "../../../Components/THREE/interaction/InteractiveBlock";
import useTeleport from "../../../Utils/useEvent";
import { MainLibModel } from "./MainLibModel";

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
                <MainLibModel position={[100, -1.7, 0]} />
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