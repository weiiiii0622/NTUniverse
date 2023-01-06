import QuestionMark from "./interactions/QuestionMark";
import Ground from "./scene/Ground";
import SFuCollisionBox from "./physics/SFuCollisionBox";
import Scene from "./scene/Demo";
import HintCircle from "./interactions/HintCircle_Bike";
import { useControls } from "leva";
import useTeleport from "../../../Utils/useEvent";
import { Triplet } from "@react-three/cannon";
import InteractiveBlock from "../../../Components/THREE/interaction/InteractiveBlock";
import ModelFBX from "../../../Components/THREE/models/ModelFBX";
import Board from "./interactions/Board";

interface IProps {
    position: Triplet,
};

export default function SFu({ position }: IProps) {

    const { x, y } = useControls("SFu", {
        x: { value: 0.5, step: 0.5 },
        y: { value: 27, step: 0.1 }
    });

    const { handleTP } = useTeleport();

    return (
        <group position={position}>
            <SFuCollisionBox />

            <Scene />

            <QuestionMark
                position={[5.5, 7.5, 5.1]}
                rotation={[0, Math.PI / 4, 0]}
                autoRotate
                tooltip="嘿嘿~被你發現了！"
            />
            <HintCircle
                position={[-27, 0, 0]}
                // position={[0, 0, 0]}
                handleEvent={() => handleTP({ location: 'MainLib' })}
            />
            <InteractiveBlock
                position={[-26, 0, 0]}
                // position={[0, 0, 0]}
                handleEvent={() => handleTP({ location: 'MainLib' })}
            />

            <Board position={[0.05, -2.5, 0.05]} />
        </group>
    )
}