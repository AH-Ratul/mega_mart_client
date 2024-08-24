import React from "react";
import HeaderSm from "../components/Header/Header_sm";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Toaster } from "react-hot-toast";

const Main = () => {
  return (
    <main className="relative bg-babypowder font-Poppins">
      {/* Header section */}
      <Header />
      <HeaderSm />

      {/** */}
      <Outlet />
      <Toaster position="top-right"/>
    </main>
  );
};

export default Main;
