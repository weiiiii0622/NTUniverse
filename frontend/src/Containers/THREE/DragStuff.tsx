import { useState } from "react";
import TestCube from "../../Components/THREE/testing/TestCube";
import TestWord from "../../Components/THREE/testing/TestWord";

export default function DragStuff() {

    const [isDragging, setIsDragging] = useState(false);
    const [objects, setObjects] = useState<any[]>([]);

    return (
        <>
            <TestWord {...{ isDragging, setIsDragging, objects }} />
            <TestCube {...{ isDragging, setIsDragging, setObjects }} />
        </>
    )
}