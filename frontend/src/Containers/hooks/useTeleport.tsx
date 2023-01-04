import { useControls } from "leva";
import { useMyContext } from "../../Utils/useMyContext";
import useBikeContext from "./useBikeContext";
import { TLocation } from './useBikeContext';

export default function useTeleport() {
    const {
        bikeTpPosition,
        setBikeTpPosition,
        setIsChangeScene,
        setBulletinModalOpen,
    } = useMyContext();

    const {
        setBikeEnabled,
        positionFromLocations,
        nameFromLocations,
    } = useBikeContext();
    const handleTP = ({ location }: { location: TLocation }) => {

        setIsChangeScene({ scene: nameFromLocations[location] });
        setBikeEnabled(false);

        const pos = positionFromLocations[location];

        setTimeout(() => {
            setBikeTpPosition(pos);
            setBikeEnabled(true);
        }, 2000);
    }

    return { handleTP };
}