import { useTexture } from "@react-three/drei"
import { Color, RepeatWrapping, Texture, Vector2 } from "three";

export default function Water() {


    const seaTexture = useTexture('./water.jpg',
        (texture: Texture) => {
            texture.repeat = new Vector2(1, 1);
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;
        });

    return <mesh>
        <cylinderGeometry args={[17, 17, 10 * 0.2, 50]} />
        <meshPhysicalMaterial
            color={new Color("#55aaff").convertSRGBToLinear().multiplyScalar(3)}
            {...{
                ior: 1.4,
                transmission: 1,
                transparent: true,
                thickness: 1.5,
                opacity: 0.5,
                envMapIntensity: 0.2,
                roughness: 1.5,
                metalness: 0.025,
                roughnessMap: seaTexture,
                metalnessMap: seaTexture,
            }}
        />
    </mesh>
}