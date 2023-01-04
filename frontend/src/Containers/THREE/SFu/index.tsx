import QuestionMark from "./interactions/QuestionMark";
import Ground from "./scene/Ground";
import SFuCollisionBox from "./physics/SFuCollisionBox";
import Scene from "./scene/Demo";

export default function SFu() {
    return (
        <>
            <Scene />
            <SFuCollisionBox />

            <QuestionMark
                position={[5.5, 7.5, 5.1]}
                rotation={[0, Math.PI / 4, 0]}
                autoRotate
            />
        </>
    )
}