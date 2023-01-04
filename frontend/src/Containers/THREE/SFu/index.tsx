import QuestionMark from "./interactions/QuestionMark";
import Ground from "./scene/Ground";
import SFuCollisionBox from "./physics/SFuCollisionBox";
import Scene from "./scene/Demo";
import HintCircle from "./interactions/HintCircle";
import { useControls } from "leva";

export default function SFu() {

    const { x, y } = useControls({ x: { value: 0, step: 0.5 }, y: { value: 0, step: 0.5 } })

    return (
        <>
            <Scene />
            <SFuCollisionBox />

            <QuestionMark
                position={[5.5, 7.5, 5.1]}
                rotation={[0, Math.PI / 4, 0]}
                autoRotate
            />
            <HintCircle
                position={[x, 0, y]}
                handleEvent={() => console.log('event~!')}
            />
        </>
    )
}