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

    const { setBikeEnabled } = useBikeContext();
    const { locationInfos, setLocation } = useLocation();
    const handleTP = ({ location }: { location: TLocation }) => {

        setIsChangeScene({ scene: locationInfos[location].name });
        setBikeEnabled(false);

        setTimeout(() => {
            setLocation(() => location);
            setBikeEnabled(true);
        }, 2000);
    }
    const handleOpenBulletin = ({ location }) => {
		setBulletinLocation(location);
		setBikeEnabled(false);
		setBulletinModalOpen(true);
	}

    return { handleTP, handleOpenBulletin };
}