import { useGLTF } from "@react-three/drei";
import Bench from "./Bench";
import BigTree from "./BigTree";
import House from "./House";

export default function HouseArea() {


    return <>
        <House />
        <Bench />
        <BigTree />
    </>
}