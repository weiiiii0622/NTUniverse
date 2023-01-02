import { Sky } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useState } from "react";

export default function AppSky() {


    const [inclination, setInclination] = useState(0.5);
    // useFrame(() => {
    //     setInclination((a) => a + 0.0005);
    // })

    return (
        <Sky
            distance={3000}
            turbidity={8}
            rayleigh={6}
            mieCoefficient={0.005}
            mieDirectionalG={0.8}
            azimuth={0.25}
            // inclination={inclination}
            sunPosition={[38, 36, -35]}
        />
    )
}