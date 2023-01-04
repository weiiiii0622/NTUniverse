import { ConfigProvider, theme } from "antd";

export default function AppConfigProvider({ children }) {
    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: '#dec141',
                // colorBgBase: '#fffbec',
            },
        }}>
            {children}
        </ConfigProvider>
    )
}