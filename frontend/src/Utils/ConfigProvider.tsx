import { ConfigProvider } from "antd";

export default function AppConfigProvider({ children }) {
    return (
        <ConfigProvider theme={{
            token: {
                colorPrimary: '#B9BC5C',
                colorBgBase: '#fffbec',
            },
        }}>
            {children}
        </ConfigProvider>
    )
}