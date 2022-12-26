import { Physics } from "@react-three/cannon";
import Bike from "../Components/Bike";
import Ground from "../Components/Ground";

export default function World() {

    return (
        <Physics>
            <Ground
                args={[150, 150]}
                rotation={[-Math.PI / 2, 0, 0]}
            />
            {/* <Tree /> */}
            {/* <Bike
                castShadow
                position={[0, -0.1, 0]}
                scale={0.03}
                rotation={[0, 0, 0]}
            /> */}
            <Bike objectProps={{
                position: [0, 0, 3],
                rotation: [0, Math.PI / 2, 0],
            }} />
        </Physics>
    )
}