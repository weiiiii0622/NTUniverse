import { useFrame } from "@react-three/fiber";
import { Howl } from "howler";
import { useEffect } from 'react';

interface IProps {
    speed: number,
};


const sound = new Howl({
    src: './sounds/bicycle.mp3',
    autoplay: true,
    loop: true,
});

const minSpeed = 15;
const maxSpeed = 30;

export default function useSound({ speed }: IProps) {

    useEffect(() => {
        sound.play();
        return () => { sound.stop(); }
    }, []);

    useFrame(() => {
        sound.rate(Math.sqrt(Math.sqrt(speed / minSpeed)));
        sound.volume(Math.pow(speed / maxSpeed, 2));
    })
}