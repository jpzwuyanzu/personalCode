// import { HashRouter } from "react-router-dom";
import { SafeArea } from "antd-mobile";
// import MRouter from "./router/index";
import Home from "./views/home";

export default function App() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ background: "#fff" }}>
        <SafeArea position="top" />
      </div>
      <div style={{ width: '100%', height: '100%' }}>
        {/* <HashRouter>
          <MRouter></MRouter>
        </HashRouter> */}
        <Home/>
      </div>
      <div style={{ background: "#fff" }}>
        <SafeArea position="bottom" />
      </div>
    </div>
  );
}
