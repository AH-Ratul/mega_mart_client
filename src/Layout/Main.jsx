import React from "react";
import HeaderSm from "../components/Header/Header_sm";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer/Footer";

const Main = () => {
  return (
    <main className="relative font-OpenSans">
      {/* Header section */}
      <Header />
      <HeaderSm />

      {/** */}
      <Outlet />
      <Footer />
      <Toaster position="top-right" />
    </main>
  );
};

export default Main;
