import QuestionMark from "./interactions/QuestionMark";
import Ground from "./scene/Ground";
import SFuCollisionBox from "./physics/SFuCollisionBox";
import Scene from "./scene/Demo";
import HintCircle from "./interactions/HintCircle";
import { useControls } from "leva";
import useTeleport from "../../hooks/useTeleport";

export default function SFu() {

    const { x, y } = useControls("SFu", {
        x: { value: 0.5, step: 0.5 },
        y: { value: 27, step: 0.5 }
    });

    const { handleTP } = useTeleport();

    return (
        <>
            <SFuCollisionBox />

            {/* <Scene />

            <QuestionMark
                position={[5.5, 7.5, 5.1]}
                rotation={[0, Math.PI / 4, 0]}
                autoRotate
            /> */}
            <HintCircle
                position={[0.5, 0, -27]}
                // position={[0, 0, 0]}
                handleEvent={() => handleTP({ location: 'MainLib' })}
            />
        </>
    )
}