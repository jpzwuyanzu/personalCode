import { HashRouter } from "react-router-dom";
import MRouter from "./router/index";
import "antd/dist/reset.css";

export default function App() {
  return (
    <>
      <HashRouter>
        <MRouter />
      </HashRouter>
    </>
  );
}
