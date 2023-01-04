import { Text3D } from "@react-three/drei";

export default function Text3DBurnFont({ italic = false, ...props }) {
    return <Text3D
        font={'./fonts/burnfont-1.2.json'}
        {...props}
    />
}