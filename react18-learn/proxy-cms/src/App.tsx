import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { HashRouter } from "react-router-dom";
import MRouter from "./router/index";
import { useAppSelector } from './hooks/hooks'
import "antd/dist/reset.css";

export default function App() {
const cusColor = useAppSelector((state) => state.cusColor.color)
  return (
    <>
     <ConfigProvider
          locale={zhCN}
          theme={{
            token: {
              colorPrimary: `${cusColor}`
              
            },
            // algorithm: [theme.darkAlgorithm]
          }}
        >
          <HashRouter>
            <MRouter />
          </HashRouter>
        </ConfigProvider>
      
    </>
  );
}
