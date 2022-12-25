import { Physics } from "@react-three/cannon";
import Bike from "./Bike";
import Chai from "./Doges/Chai";
import WhiteDoge from "./Doges/WhiteDoge";
import Ground from "./Ground";
import Tree from "./Tree";

export default function World() {

    return (
        <Physics>
            <Ground
                args={[150, 150]}
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <Bike
                castShadow
                position={[4, -0.1, 3]}
                scale={0.03}
            />
            <Tree
                scale={0.5}
            />
            <Chai
                position={[4, 0, -3]}
                castShadow />
            <WhiteDoge
                objectProps={{
                    scale: 0.005,
                    position: [-5, 0, -5],
                }}
                lookAt={[-5, 0, -10]}
            />
        </Physics>
    )
}