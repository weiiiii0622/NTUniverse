import { Triplet } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { BoxGeometry } from "three";
import InteractiveBlock from "../../../Components/THREE/interaction/InteractiveBlock";
import useTeleport from "../../../Utils/useEvent";
import MainLibCollisionBox from "./MainLibCollisionBox";
import { MainLibModel } from "./MainLibModel";
import Board_MainLib from "./interactions/Board_MainLib";
import HintCircle_Bike_MainLib from "../../../Components/THREE/interaction/HintCircle_Bike_MainLib";

const MainLibPosition: Triplet = [300, 0, 300];

interface IProps {
    position: Triplet,
};
export default function MainLib({ position }: IProps) {

    const { handleTP } = useTeleport();


    useFrame(() => {
        // console.log(camera.position)
    })

    const { x, y } = useControls('main', {
        x: {
            value: 0,
            step: 0.5,
        },
        y: {
            value: 0,
            step: 0.5,
        }
    })

    return (
        <>
            {/* <OrbitControls target={MainLibPosition} /> */}

            {/* <AppSky /> */}

            <group position={position} name="main lib. scene">

                <MainLibModel position={[100, -1.7, 0]} />
                <MainLibCollisionBox />

                <Board_MainLib position={[85, -2.4, -5]} />
            </group>
            <HintCircle_Bike_MainLib
                position={[300, 0, 300]}
                // position={[0, 0, 0]}
                handleEvent={() => handleTP({ location: 'SFu' })}
            />


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