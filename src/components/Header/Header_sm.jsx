import React from "react";
import logo from "../../assets/New logo2.svg";
import { allIcons } from "../../data/all-icons";

const HeaderSm = () => {
  const { home, dashboard, cart, account, search, wish } = allIcons;
  return (
    <main className="md:hidden h-[100dvh]">
      {/* bottom header */}
      <section className=" bg-gray-100 py-2 fixed bottom-0 w-[100dvw] z-20 flex justify-between items-center px-8">
        <span className="text-secondary">{home}</span>
        <span className="text-gray1">{dashboard}</span>
        <span className="text-gray1">{cart}</span>
        <span className="text-gray1">{account}</span>
      </section>
      {/* header */}
      <div className="bg-gray-100 text-gray1">
        <a href="" className="">{wish}</a>
      </div>
      <div className="flex flex-col justify-center items-center px-2">
        <div className="w-[50%]">
          <a href="/">
            <img src={logo} alt="logo" className="" />
          </a>
        </div>
        <div className="flex">
          <input
            type="text"
            className="border border-secondary p-1 ps-3 w-full outline-none"
            placeholder="Search"
          />
          <button className="bg-secondary py-1 px-4 text-white/90">
            {search}
          </button>
        </div>
      </div>
    </main>
  );
};

export default HeaderSm;
