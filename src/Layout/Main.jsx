import React from "react";
import HeaderSm from "../components/Header/Header_sm";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="relative bg-babypowder">
      {/* Header section */}
      <HeaderSm />

      {/** */}
      <Outlet />
    </main>
  );
};

export default Main;
