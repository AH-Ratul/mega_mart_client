import React from "react";
import HeaderSm from "../components/Header/Header_sm";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer/Footer";

const Main = () => {
  return (
    <div className="relative flex flex-col min-h-screen font-OpenSans">
      {/* Header section */}
      <Header />
      <HeaderSm />

      {/* main contents */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* footer */}
      <Footer />

      <Toaster position="top-right" />
    </div>
  );
};

export default Main;
