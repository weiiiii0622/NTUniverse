import { Quad, Triplet } from "@react-three/cannon";
import { useEffect, useState } from "react";
import { Euler, Quaternion, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import AppOrbitControls from "../scene/OrbitControls";
import useBikeContext, { BikeCameraType } from "../../../Containers/hooks/useBikeContext";
import { useKeyPress } from "./hooks/useControls";
import useLocation from "../../../Containers/hooks/useLocation";


const bikeCamPositions: Record<BikeCameraType, Triplet> = {
    defaultSFu: [-10, 13, -13],
    defaultMainLib: [-10, 7, -13],
    tutorial: [-6, 5, -7],
    free: [-10, 13, -13],
    first: [0, 3, -9],
}


interface BikeCameraProps {
    bikeRotation: Quad,
};
export default function BikeCamera({ bikeRotation }: BikeCameraProps) {

    const { prevCameraType, cameraType, setCameraType, bikePosition } = useBikeContext();
    const [freeCameraPosition, setFreeCameraPosition] = useState<Vector3>(new Vector3());
    const [controlsEnabled, setControlsEnabled] = useState(false);
    const { location, locationInfos } = useLocation();
    const { camera } = useThree();

    const applyBikeWorld = (pos: Triplet) => {
        return new Vector3(...pos)
            .applyQuaternion(new Quaternion(...bikeRotation))
            .add(new Vector3(...bikePosition))
        // .add(new Vector3(...locationInfos[location].position))
    }

    const switchFirst = ({ key }) => {
        if (key === 'f' || key === 'F') {
            if (cameraType === 'first') {
                if (location === 'SFu')
                    setCameraType('defaultSFu');
                else if (location === 'MainLib')
                    setCameraType('defaultMainLib');
            }
            else
                setCameraType('first');
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', switchFirst)
        return window.removeEventListener('keyup', switchFirst);
    }, [cameraType]);

    const switchFree = ({ key }) => {
        if (key === 'y' || key === 'Y') {
            if (cameraType === 'free') {
                setCameraType(prevCameraType);
            }
            else
                setCameraType('free');
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', switchFree)
        return window.removeEventListener('keyup', switchFree);
    }, [cameraType]);


    useEffect(() => {
        setControlsEnabled(cameraType === 'free');
        switch (cameraType) {
            case 'defaultSFu':
            case 'defaultMainLib':
            case 'first':
                camera.lookAt(...bikePosition);
                break;
            case 'free':
                setFreeCameraPosition(applyBikeWorld(bikeCamPositions[prevCameraType]));
                break;
        }
    }, [camera, cameraType]);

    // const { type } = useControls({
    //     type: {
    //         options: {
    //             0: 'default',
    //             1: 'tutorial',
    //             2: 'free',
    //             3: 'first',
    //         },
    //     },
    // }) as { type: BikeCameraType };
    // useEffect(() => {
    //     setCameraType(type);
    // }, [type]);

    return (
        <>
            {controlsEnabled
                ? <AppOrbitControls
                    cameraPosition={
                        freeCameraPosition
                    }
                    enable={controlsEnabled}
                />
                : <PerspectiveCamera
                    position={bikeCamPositions[cameraType]}
                    name="My camera"
                    makeDefault
                // zoom={1.65}
                />}
        </>
    )
}
