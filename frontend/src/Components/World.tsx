import { Physics } from "@react-three/cannon";
import Bike from "./Bike";
import Doge from "./Doge";
import Ground from "./Ground";
import Tree from "./Tree";

export default function World() {
    return (
        <Physics>
            <Ground
                args={[150, 150]}
                rotation={[-Math.PI / 2, 0, 0]}
            />
            <Bike position={[3, 2, 3]} />
            <Tree scale={0.5}/>
            <Doge position={[4,0,0]} />
        </Physics>
    )
}