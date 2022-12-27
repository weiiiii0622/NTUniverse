import { Physics } from "@react-three/cannon";
import { Stars } from "@react-three/drei";
import Bike from "../../Components/THREE/Bike";
import Bench from "../../Components/THREE/static/Bench";
import Ground from "../../Components/THREE/static/Ground";
import Stairs from "../../Components/THREE/static/Stairs";
import Tree1 from "../../Components/THREE/static/Trees/Tree1";
import Tree2 from "../../Components/THREE/static/Trees/Tree2";

export default function World() {

    return (
        <Physics>
            {/* <Debug> */}
            <Ground
                args={[1000, 1000]}
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <Tree1 position={[3, 0, -5]} />
            <Bench position={[-5, 0, 5]} rotation={[0, Math.PI / 2, 0]} />
            <Bike objectProps={{
                position: [5, 0.5, 5],
                rotation: [0, -Math.PI * 3 / 4, 0],
            }} />
            {/* </Debug> */}
        </Physics>
    )
}