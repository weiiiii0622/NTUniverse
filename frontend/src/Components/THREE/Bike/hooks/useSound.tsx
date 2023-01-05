import { useFrame } from "@react-three/fiber";
import { Howl } from "howler";
import { useEffect } from 'react';
import useBikeContext from "../../../../Containers/hooks/useBikeContext";

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

const bgMusic = new Howl({
    src: './sounds/music.mp3',
    volume: 0.5,
    autoplay: true,
    loop: true,
})

const bell = new Howl({
    src: './sounds/bike-bell.mp3',
    volume: 0.5,

});

const lingLing = (e: KeyboardEvent) => {
    if (e.key === 'l' || e.key === 'L')
        bell.play();
};

const minSpeed = 15;
const maxSpeed = 30;


export default function useSound({ speed }: IProps) {

    const { bikeEnabled } = useBikeContext();
    const { volumeValue } = useBikeContext();

    useEffect(() => {
        if (bikeEnabled)
            //console.log('hi')
    }, [bikeEnabled]);

    useEffect(() => {

        bgMusic.play();

        if (!bikeEnabled) {
            sound1.stop();
            sound2.stop();
            return;
        }

        sound1.play();
        sound2.play();

        window.addEventListener('keypress', lingLing);

        return () => {
            sound1.stop();
            sound2.stop();
            bgMusic.stop();
            window.removeEventListener('keypress', lingLing);
        }
    }, [bikeEnabled]);

    useFrame(() => {
        if (isFinite(Math.sqrt(Math.sqrt(speed / minSpeed))))
            sound1.rate(Math.sqrt(Math.sqrt(speed / minSpeed)));
        sound1.volume(Math.pow(speed / maxSpeed, 2) * volumeValue / 100);

        sound2.volume(Math.sqrt(speed / maxSpeed * 0.2) * volumeValue / 100);
        bgMusic.volume(0.5 * volumeValue / 100);
        bell.volume(volumeValue / 100);
    })

}