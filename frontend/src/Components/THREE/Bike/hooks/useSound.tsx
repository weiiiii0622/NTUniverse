import { useFrame } from "@react-three/fiber";
import { Howl } from "howler";
import { useEffect } from 'react';

interface IProps {
    speed: number,
};


const sound1 = new Howl({
    src: './sounds/bicycle.mp3',
    autoplay: true,
    loop: true,
});

const sound2 = new Howl({
    src: './sounds/bicycle2.mp3',
    autoplay: true,
    loop: true,
});

const bell = new Howl({
    src: './sounds/bike-bell.mp3',
    volume: 0.25,
});

const lingLing = (e: KeyboardEvent) => {
    if (e.key === '1')
        bell.play();
};

const minSpeed = 15;
const maxSpeed = 30;

const totalVolume = 0;  // should be a context state in the future

export default function useSound({ speed }: IProps) {

    useEffect(() => {
        sound1.play();
        sound2.play();  

        window.addEventListener('keypress', lingLing);

        return () => {
            sound1.stop();
            sound2.stop();
            window.removeEventListener('keypress', lingLing);
        }
    }, []);

    useFrame(() => {
        if (isFinite(Math.sqrt(Math.sqrt(speed / minSpeed))))
            sound1.rate(Math.sqrt(Math.sqrt(speed / minSpeed)));
        sound1.volume(Math.pow(speed / maxSpeed, 2) * totalVolume);

        sound2.volume(Math.sqrt(speed / maxSpeed * 0.2) * totalVolume);
    })

}