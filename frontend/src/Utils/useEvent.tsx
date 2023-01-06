import { useControls } from "leva";
import { useMyContext } from "./useMyContext";
import useBikeContext from "../Containers/hooks/useBikeContext";
import useLocation, { TLocation } from "../Containers/hooks/useLocation";

export default function useEvent() {
    const {
        setIsChangeScene,
        setBulletinModalOpen,
        setBulletinLocation
    } = useMyContext();

    const { setBikeEnabled, setCameraType } = useBikeContext();
    const { locationInfos, setLocation } = useLocation();
    const handleTP = ({ location }: { location: TLocation }) => {

        setIsChangeScene({ scene: locationInfos[location].name });
        setBikeEnabled(false);

        setTimeout(() => {
            if (location === 'MainLib')
                setCameraType('defaultMainLib');
            else if (location === 'SFu')
                setCameraType('defaultSFu');
            setLocation(() => location);
            setBikeEnabled(true);
        }, 1500);
    }
    const handleOpenBulletin = ({ location }) => {
        setBulletinLocation(location);
        setBikeEnabled(false);
        setBulletinModalOpen(true);
    }

    return { handleTP, handleOpenBulletin };
}