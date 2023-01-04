import { useControls } from "leva";
import { useMyContext } from "../../Utils/useMyContext";
import useBikeContext from "./useBikeContext";
import useLocation, { TLocation } from "./useLocation";

export default function useTeleport() {
    const {
        bikeTpPosition,
        setBikeTpPosition,
        setIsChangeScene,
        setBulletinModalOpen,
    } = useMyContext();

    const { setBikeEnabled } = useBikeContext();
    const { locationInfos } = useLocation();
    const handleTP = ({ location }: { location: TLocation }) => {

        setIsChangeScene({ scene: locationInfos[location].name });
        setBikeEnabled(false);

        const pos = locationInfos[location].position;

        setTimeout(() => {
            setBikeTpPosition(pos);
            setBikeEnabled(true);
        }, 2000);
    }

    return { handleTP };
}