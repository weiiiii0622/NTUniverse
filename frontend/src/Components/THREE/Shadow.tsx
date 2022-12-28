import { ContactShadows } from "@react-three/drei";
import { useControls } from "leva";


// This is shadow is cool but bugged 😢

export default function Shadow() {

    const { opacity, blur, color } = useControls('Shadow', {
        color: '#24344e',
        opacity: {
            value: 0.25,
            min: 0,
            max: 1,
        },
        blur: {
            value: 0.8,
            min: 0,
            max: 10,
        },
    });

    return (
        <ContactShadows
            // resolution={2048}
            position={[0, 0, 0]}
            scale={50}
            // width={20}
            far={5}
            rotation={[Math.PI / 2, 0, 0]}
            {...{ color, opacity, blur }}
        />
    )
}