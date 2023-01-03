import { Html, useProgress } from '@react-three/drei';
import { useEffect } from 'react';
import { useMyContext } from '../../Utils/useMyContext';


const Loader = () => {
    const { setIsLoading } = useMyContext();
	const { active, progress, errors, item, loaded, total} = useProgress();
    useEffect(() => {
        if(active === false){
            //setIsLoading(false);
        }
    }, [progress])
	return (
		<Html 
            center 
            style={{
                height: '100vh',
                //width: '100vw',
                position: 'absolute',
                backgroundColor: 'black',
            }}
        >
			{/* {progress} % loaded */}
		</Html>
	)
}


export default Loader;