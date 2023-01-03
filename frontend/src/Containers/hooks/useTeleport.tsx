import { useControls } from "leva";
import { useMyContext } from "../../Utils/useMyContext";
import useBikeContext from "./useBikeContext";

export default function useTeleport() {
    const {
        bikeTpPosition,
        setBikeTpPosition,
        setIsChangeScene,
        setBulletinModalOpen,
    } = useMyContext();

    const { setBikeEnabled, setLocation } = useBikeContext();

    const handleTP = ({ scene, pos }) => {
        setIsChangeScene({ scene: scene });
        setBikeEnabled(false);
        setTimeout(() => {
            setBikeTpPosition(pos);
            setBikeEnabled(true);
        }, 2000);
    }

    return { handleTP };
}