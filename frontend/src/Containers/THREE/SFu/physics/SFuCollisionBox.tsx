import { Triplet, useBox, useCompoundBody, usePlane } from "@react-three/cannon";
import { useControls } from "leva";
import { message, notification } from 'antd';
import { useState } from "react";

interface PlatformProps {
    position: Triplet,
};

function Platform({ position }: PlatformProps) {
    const [ref, api] = useBox(() => ({
        type: "Static",
        args: [16, 0.5, 16],
        position: position,
        mass: 1000,
    }));

    return (
        <>
            <mesh ref={ref as any}>
            </mesh>
        </>
    )
}

function Stairs(
    { position, rotation }: { position: Triplet, rotation: Triplet }
) {
    const [ref, api] = useBox(() => ({
        type: "Static",
        position,
        rotation,
        args: [2, 1, 2.7],
    }))

    return <>
        <mesh ref={ref as any} />
    </>
}

const suicideMsgs = [
    ['warning', '請珍惜生命...'],
    ['warning', '「無論發生了什麼，我都會溫柔地接住你。」  ──地圖邊界'],
    ['warning', 'NTUniverse 是一個美麗的宇宙，我們不容許任何危險的行為。'],
    ['error', '「幹！撞三小？😡」'],
]

let flag = true;
function Wall({ position, rotation }: { position: Triplet, rotation: Triplet }) {

    const [count, setCount] = useState(0);
    const send = (index: number) => {
        setCount(c => c + 1);
        message[suicideMsgs[index][0]](suicideMsgs[index][1]);
    }

    const handleCollide = () => {
        if (!flag) return;
        flag = false;
        setTimeout(() => { flag = true }, 1000);

        send(Math.floor(Math.random() * suicideMsgs.length));
    }

    const [ref, api] = useBox(() => ({
        type: "Static",
        args: [40, 10, 1],
        position,
        rotation,
        onCollide: handleCollide,
    }));


    return <>
        <mesh ref={ref as any} />
    </>
}

function Barriers(
    { position, rotation, args }: { args: Triplet, position: Triplet, rotation: Triplet }
) {
    const [ref, api] = useBox(() => ({
        type: "Static",
        position,
        rotation,
        args,
    }))

    return <>
        <mesh ref={ref as any} />
        {/* <mesh {...{ position, rotation }}>
            <boxGeometry args={args} />
            <meshStandardMaterial />
        </mesh> */}
    </>
}

export default function SFuCollisionBox() {

    const { wall, rot, args } = useControls({
        wall: {
            value: {
                x: 0,
                y: 0,
            },
            step: .5,
        },
        rot: {
            value: 0,
            step: 0.1,
        },
        args: {
            value: {
                x: 1,
                y: 1,
                z: 1,
            },
            step: 0.5,
        }
    })

    const wallInfos: [Triplet, Triplet][] = [
        [[0, -1.6, 0], [29.4, 0, -0.6]],
        [[0, -1, 0], [24.4, 0, -17.1]],
        [[0, -0.3, 0], [11.4, 0, -26.6]],
        [[0, 0.2, 0], [-5.8, 0, -29.4]],
        [[0, 0.8, 0], [-20.7, 0, -21]],
        [[0, 1.4, 0], [-28.5, 0, -5]],
        [[0, 2.1, 0], [-26.5, 0, 13.8]],
        [[0, 2.7, 0], [-13.3, 0, 26]],
        [[0, 3.4, 0], [5.6, 0, 29]],
        [[0, 3.9, 0], [18.8, 0, 23]],
        [[0, 4.3, 0], [26, 0, 13.4]],
    ];


    return <>
        <Platform position={[12.3, 0.5, 11.9]} />
        <Platform position={[-12, 0.5, 12]} />
        <Platform position={[-12, 0.5, -12]} />
        <Platform position={[12, 0.5, -12]} />

        <Stairs position={[3.7, -0, 11.6]} rotation={[0, 0, Math.PI / 7]} />
        <Stairs position={[-3.5, -0, 11.6]} rotation={[0, 0, -Math.PI / 5]} />
        <Stairs position={[3.8, -0, -11.85]} rotation={[0, 0, Math.PI / 6]} />
        <Stairs position={[-3.5, -0, -11.85]} rotation={[0, 0, -Math.PI / 5]} />

        <Stairs position={[12.2, 0, -3.9]} rotation={[0, Math.PI / 2, Math.PI / 7]} />
        <Stairs position={[12.2, 0, 3.5]} rotation={[0, Math.PI / 2, -Math.PI / 5]} />
        <Stairs position={[-11.9, 0, -3.9]} rotation={[0, Math.PI / 2, Math.PI / 7]} />
        <Stairs position={[-11.9, 0, 3.5]} rotation={[0, Math.PI / 2, -Math.PI / 5]} />

        {wallInfos.map(([rot, pos], i) => <Wall position={pos} rotation={rot} key={'wall' + i} />)}

        <Barriers position={[-1.9, 0, -21.1]} rotation={[0, 1.1, 0]} args={[2, 1, 2.7]} />
        <Barriers position={[2.4, 0, -19.8]} rotation={[0, 0, 0]} args={[3, 1, 1]} />
        <Barriers position={[21.4, 0, -2.1]} rotation={[0, 1.9, 0]} args={[5, 1.5, 1]} />
        <Barriers position={[21.8, 0, 3.1]} rotation={[0, 1.2, 0]} args={[5, 1.5, 1]} />

    </>
}