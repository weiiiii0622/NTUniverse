import { useState } from "react";
import "./FancyBtn.css"

const FancyBtn = ({ onClick }) => {

    const [hover, setHover] = useState(false);

    return <div style={{ position: 'relative' }} onClick={onClick}>
        <div
            className="startBtn"
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div>
                開始探索
            </div>
        </div>
{/* <div className='startBtnShadow'></div> */ }
    </div >
}
export default FancyBtn;