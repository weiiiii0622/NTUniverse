import { ContactShadows } from "@react-three/drei";
import { useControls } from "leva";


// This is shadow is cool but bugged 😢

export default function Shadow() {

    const { opacity, blur, color, scale } = useControls('Shadow', {
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
        scale: {
            value: 50,
            min: 1,
            max: 100,
            step: 0.5,
        }
    });

    return (
        <ContactShadows
            resolution={2048}
            position={[0, 0, 0]}
            {...{ color, opacity, blur, scale}}
        />
    )
}