import React from "react";
import ReactDOM from "react-dom/client";
// import { ConfigProvider, theme } from "antd";
import { Provider } from "react-redux";
import store, { persistor } from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

import App from "./App.tsx";
import './App.css'
import "reset-css";
import "./index.css";

dayjs.locale("zh-cn");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <ConfigProvider
          locale={zhCN}
          theme={{
            token: {
              colorPrimary: "#00b96b"
              
            },
            // algorithm: [theme.darkAlgorithm]
          }}
        > */}
          <App />
        {/* </ConfigProvider> */}
      </PersistGate>
    </Provider>
  // {/* </React.StrictMode> */}
);
