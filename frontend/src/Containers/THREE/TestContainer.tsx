import { Center, Sparkles, Text3D } from "@react-three/drei";
import { useMemo } from "react";
import { useControls } from "leva";
import { animated, easings, useSpring, useChain } from "@react-spring/three";
import { EffectComposer } from "@react-three/postprocessing";
import { Bloom } from "@react-three/postprocessing";

export default function TestContainer() {

    const sizes = useMemo(() => {
        return new Float32Array(Array.from({ length: 100 }, () => Math.random() * 15))
    }, []);

    const { repeat } = useControls({
        repeat: 5,
    })

    const spring = useSpring({
        from: {
            position: [0, 3.5, 0],
            opacity: 1,
        },
        to: [{
            position: [0, 5, 0],
            opacity: 0,
        }],
        config: (key) => {
            switch (key) {
                case 'position':
                    return {
                        damping: 20,
                        mass: 0.5,
                        tension: 200,
                        friction: 3,
                        velocity: 0,
                        easing: easings.easeInCubic,
                    }
            }
            return {
                duration: 2000,
            };
        },
        // delay: 0,

        loop: true,
    });

    const C = animated(Center);
    //console.log(C);

    const [spring1, api1] = useSpring(() => ({
        from: {
            position: [0, 0, 0],
        },
        // to: {
        // position: [1, 1, 1],
        // },
        // : true,
    }));
    const [spring2, api2] = useSpring(() => ({
        from: { position: [1, 1, 1], }
    }));

    // useChain([api1, api2]);

    return (
        <>
            {/* @ts-ignore */}
            <animated.mesh  {...spring1} onClick={() => { api1.start({ position: [1, 1, 1] }); }}>
                <boxGeometry />
                <meshBasicMaterial />
            </animated.mesh>

            <EffectComposer>
                <Bloom
                    mipmapBlur
                    intensity={0.5}
                />
            </EffectComposer>
            {/* <Float
                // position={[0, 0, 0]}
                // rotation={[Math.PI / 3.5, 0, 0]}
                rotationIntensity={1.5}
                floatIntensity={1}
                floatingRange={[0, 1]}
                speed={5}
            > */}
            {/*@ts-ignore*/}
            <C
                {...spring}
            >
                <Text3D font={'/fonts/burnfont-1.2.json'} bevelEnabled bevelSize={0.05}>
                    {/* <meshNormalMaterial /> */}
                    <animated.meshStandardMaterial
                        // {...spring}
                        transparent
                        emissive={'#d3d300'}
                        emissiveIntensity={3}
                        color={"#d7c86b"}
                        roughness={1}
                        toneMapped={false}
                    />
                    ！
                </Text3D>
            </C>
            {/* </Float> */}


            <Sparkles
                scale={3.5}
                noise={1}
                color="#ddc180"
                size={sizes}
                count={75}
                position={[0, 1.5, 0]}
                opacity={0.3}
            />

        </>
    )
}