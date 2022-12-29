import { useRef, useState } from "react";
import HtmlBtn from "../../Components/THREE/testing/HtmlBtn";
import Map from "../../Components/THREE/testing/Map";
import TestCube from "../../Components/THREE/testing/TestCube";
import TestWord from "../../Components/THREE/testing/TestWord";

export default function TestContainer() {

    const [isDragging, setIsDragging] = useState(false);

    const [objects, setObjects] = useState<any[]>([]);

    return (
        <>
            <TestWord {...{ isDragging, setIsDragging, objects }} />
            <TestCube {...{ isDragging, setIsDragging, setObjects }} />
            <HtmlBtn />
            {/* <Map position={[-7, 0,-1]} rotation={[0, Math.PI / 4, 0]}/> */}
        </>
    )
}