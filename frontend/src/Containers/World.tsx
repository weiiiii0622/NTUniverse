import { Debug, Physics } from "@react-three/cannon";
import TestVehicle from "../Components/Beetle (unused)/Vehicle";
import Bike from "../Components/Bike";
import Ground from "../Components/Ground";
import ModelFBX from "../Components/models/ModelFBX";
import TestCube from "../Components/TestCube";
import Tree from "../Components/Tree";

export default function World() {

    return (
        <Physics>
            {/* <Debug> */}
                <Ground
                    args={[1000, 1000]}
                    rotation={[-Math.PI / 2, 0, 0]}
                />
                {/* <Tree /> */}
                <Bike objectProps={{
                    position: [5, 0.5, 5],
                    rotation: [0, -Math.PI * 3 / 4, 0],
                }} />
                {/* <TestVehicle /> */}
            {/* </Debug> */}
        </Physics>
    )
}