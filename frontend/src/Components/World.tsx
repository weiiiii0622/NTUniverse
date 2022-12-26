import { Physics } from "@react-three/cannon";
import Vehicle1 from "./Beetle/Vehicle";
import Vehicle from "./Bicycle/Vehicle";
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
            {/* <Tree /> */}
            {/* <Bike
                castShadow
                position={[0, -0.1, 0]}
                scale={0.03}
                rotation={[0, 0, 0]}
            /> */}
            <Vehicle />
        </Physics>
    )
}