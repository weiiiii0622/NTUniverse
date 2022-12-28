import { Debug, Triplet, useBox } from "@react-three/cannon"
import { Html } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { Button } from "antd";
import { RefObject, useContext } from "react";
import { Mesh } from "three";
import Palm from "../../Components/THREE/static/Palm";
import TestCube from "../../Components/THREE/testing/TestCube";
import { ThreeContext } from "./Canvas";

export default function TestContainer() {

    const {
        helpers, setHelpers,
        enableControls, setEnableControls
    } = useContext(ThreeContext);

    return (
        <>
            <Html
                transform
                rotation={[-Math.PI / 2, 0, Math.PI / 6]}
                position={[5, 0, 1]}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: '15px',
                }}>
                <Button
                    size="large" type="primary"
                    onClick={() => setEnableControls((e) => !e)}
                >
                    {enableControls
                        ? "Disable Control"
                        : "Enable Control"
                    }
                </Button>
                <Button
                    size="large" type="primary"
                    onClick={() => setHelpers((h) => !h)}
                >
                    {helpers
                        ? "Hide Helpers"
                        : "Show Helpers"
                    }
                </Button>
            </Html>
        </>
    )
}