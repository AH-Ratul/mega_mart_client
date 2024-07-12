import React from "react";
import logo from "../../assets/logo11.svg";
import { allIcons } from "../../data/all-icons";
import { Link } from "react-router-dom";

const HeaderSm = () => {
  const { home, dashboard, cart, account, search, wish, list } = allIcons;
  return (
    <main className="lg:hidden h-[100dvh]">
      {/* bottom header */}
      {/*<section className="bg-gray-100 py-2 fixed bottom-0 w-[100dvw] z-20 flex justify-between items-center px-8">
        <span className="text-secondary">{home}</span>
        <span className="text-gray1">{dashboard}</span>
        <span className="text-gray1">{cart}</span>
        <span className="text-gray1">{account}</span>
      </section>*/}

      {/* header */}
      <div className="bg-gray-100 text-xs flex justify-end items-center">
        <Link className="bg-secondary py-1 px-3 text-white/90">
          {account} My Account
        </Link>
        <Link className="text-gray1 px-2 border-r border-gray1">{wish}</Link>
      </div>
      {/** */}
      <div className="flex flex-col justify-center items-center ">
        <div className="w-[45%]">
          <a href="/">
            <img src={logo} alt="logo" className="" />
          </a>
        </div>
        <div className="flex w-full px-3">
          <input
            type="text"
            className="border border-secondary p-1 ps-3 w-full outline-none"
            placeholder="Search"
          />
          <button className="bg-secondary py-1 px-4 text-white/90">
            {search}
          </button>
        </div>
        {/** */}
        <div className="flex justify-between px-4 items-center gap-20 mt-3 bg-gray-700 w-full">
          <Link className="text-white/90 flex items-center">
            <span className="">{list}</span>CATEGORY
          </Link>
          <Link className="flex items-center py-1 text-sm">
            <span className="bg-gray-50 bg-opacity-35 p-2 text-white/70 mr-3">
              {cart}
            </span>
            <div className="flex flex-col text-white/90">
              <span className="text-secondary">MY CART</span>
              <span>2 Items - $40.0</span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HeaderSm;
