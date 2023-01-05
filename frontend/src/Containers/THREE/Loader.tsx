import { Html, useProgress } from '@react-three/drei';
import { useEffect } from 'react';
import { useMyContext } from '../../Utils/useMyContext';


const Loader = () => {
    const { setIsLoading } = useMyContext();
    const { active, progress, errors, item, loaded, total } = useProgress();
    useEffect(() => {
        if (active === false) {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }, [loaded])
    return (
        <Html
            center
            style={{
                display: 'none',
                //height: '100vh',
                //width: '100vw',
                //position: 'absolute',
                //backgroundColor: 'black',
            }}
        >
            {/* {progress} % loaded */}
        </Html>
    )
}


export default Loader;