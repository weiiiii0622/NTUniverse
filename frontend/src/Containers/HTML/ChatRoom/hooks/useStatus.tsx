import { message } from "antd";
import { useEffect } from "react";
import { IStatus } from "../App";

const useStatus = (status: IStatus) => {
    const displayStatus = (status: IStatus) => {
        if (!status.msg) return;
        const { type, msg } = status;
        const content = { content: msg, duration: 0.75 };
        switch (type) {
            case 'success':
                message.success(content);
                break;
            case 'info':
                message.info(content);
                break;
            case 'warning':
                message.warning(content);
                break;
            case 'error':
            default:
                message.error(content);
        }
    }
    useEffect(() => {
        if (status) displayStatus(status)
    }, [status]);
}

export default useStatus;