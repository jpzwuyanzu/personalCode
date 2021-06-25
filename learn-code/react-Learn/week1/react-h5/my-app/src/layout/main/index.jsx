import React, { useEffect, useState } from "react";
import TabBarCom from "./TabBar";
import RouterView from "../../router/RouterView";
import { useLocation } from "react-router-dom";
import './index.scss'
const barPath = ["/home", "/play", "/my"];

const Main = () => {
  const [showtabbar, setShowtabbar] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    barPath.indexOf(pathname) === -1
      ? setShowtabbar(false)
      : setShowtabbar(true);
  }, [pathname]);

  return (
    <div className="mainPage">
      <div className="mainContent">
        <RouterView />
      </div>
      {showtabbar ? <TabBarCom /> : null}
    </div>
  );
};

export default Main;
