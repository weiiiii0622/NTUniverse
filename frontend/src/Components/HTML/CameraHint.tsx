import { animated, useSpringRef, useSpring } from '@react-spring/web';
import { useState, useEffect } from 'react';
import useBikeContext from '../../Containers/hooks/useBikeContext';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function CameraHint() {
    const { cameraType, bikeEnabled } = useBikeContext();
    const [isActive, setIsActive] = useState(false);
    const [text, setText] = useState('');
    useEffect(() => {

        //console.log(bikeEnabled);

        if (!bikeEnabled)
            return;

        setIsActive(true);
        api.start();
        switch (cameraType) {
            case 'default':
                setText('鎖定視角模式');
                break;
            case 'first':
                setText('第一人稱視角');
                break;
            case 'free':
                setText('自由視角模式 ─ 再次按下 Y 以鎖定')
        }
    }, [cameraType]);


    const api = useSpringRef();
    const { opacity } = useSpring({
        ref: api,
        from: { opacity: 0 },
        to: async (next,) => {
            await next({ opacity: 1 });
            await sleep(1000);
            await next({ opacity: 0 });
        },
        reset: true,
        onRest: () => { setIsActive(false); }
    });


    return (
        //@ts-ignore
        <animated.div style={{
            position: 'absolute',
            zIndex: 300,
            opacity,
            top: '75%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#FFFBEF',
            fontSize: 20,
        }}>
            {text}
        </animated.div>
    )
}