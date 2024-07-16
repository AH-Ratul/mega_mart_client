import React from "react";
import HeaderSm from "../components/Header/Header_sm";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const Main = () => {
  return (
    <main className="relative bg-babypowder">
      {/* Header section */}
      <Header />
      <HeaderSm />

      {/** */}
      <Outlet />
    </main>
  );
};

export default Main;
