import { Physics } from "@react-three/cannon";
import Bike from "../Components/Bike";
import Ground from "../Components/Ground";
import ModelFBX from "../Components/models/ModelFBX";
import Tree from "../Components/Tree";

export default function World() {

    return (
        <Physics>
            <Ground
                args={[150, 150]}
                rotation={[-Math.PI / 2, 0, 0]}
            />
            {/* <Tree /> */}
            <Bike objectProps={{
                position: [0, 0, 3],
                // rotation: [0, Math.PI / 2, 0],
            }} />
            {/* <ModelFBX filePath="./resources/models/bike/frontWheel.fbx"
                objectProps={{ position: [0, 0, 0] }} /> */}
        </Physics>
    )
}