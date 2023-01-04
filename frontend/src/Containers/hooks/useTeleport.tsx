import { useControls } from "leva";
import { useMyContext } from "../../Utils/useMyContext";
import useBikeContext from "./useBikeContext";
import useLocation, { TLocation } from "./useLocation";

export default function useTeleport() {
    const {
        setIsChangeScene,
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

    return { handleTP };
}