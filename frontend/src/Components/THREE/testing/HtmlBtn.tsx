import { Html } from "@react-three/drei";
import { Button } from "antd";
import { useContext } from "react";
import { ThreeContext } from "../../../Containers/THREE/Canvas";

export default function HtmlBtn() {

    const {
        enableControls, setEnableControls,
        helpers, setHelpers
    } = useContext(ThreeContext);

    return (
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
            // style={{ backgroundColor: '' }}
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
    )
}