import React, { useState } from "react";
import logo from "../../../public/logo12.svg";
import { allIcons } from "../../data/all-icons";
import Headlines from "../Headlines/Headlines";
import DropOnHover from "../Shared/DropDown/DropOnHover";
import DropDown from "../Shared/DropDown/DropDown";

const Header = () => {
  const { account, wish, search, cart2 } = allIcons;

  const headlines = [
    "50% off on all products! .....",
    "Free shipping on orders over $50! .....",
    "New collection just arrived! .....",
    "Limited time offer: Buy 1 Get 1 Free! .....",
  ];
  return (
    <header className="hidden lg:block ">
      {/* upper div */}
      <div className="flex justify-between items-center bg-d2  px-10 border-b">
        <div>
          <Headlines headlines={headlines} />
        </div>
        {/* account */}
        <div className="flex items-center text-white/70 ">
          <div className="flex items-center text-xs px-3 py-2 border-r border-l border-gray1 gap-1 cursor-pointer relative group">
            {account}MY ACCOUNT
            <DropOnHover />
          </div>
          {/* wish list */}
          <div className="flex items-center text-xs px-3 pr-5 py-2  gap-1 cursor-pointer">
            {wish} WISH LIST (2)
          </div>
          {/* my cart */}
          <div className="flex items-center text-xs text-white/90 px-3 py-2 gap-1 bg-gray2 cursor-pointer relative">
            <span className="text-lg">{cart2}</span> MY CART
            <span className="bg-red-400 pb-[1px] text-white rounded-full px-1 text-xs">
              2
            </span>
            <DropDown />
          </div>
        </div>
      </div>
      {/* lower div */}
      <div className="py-4 px-10 flex justify-between items-center">
        <a href="/">
          <img src={logo} alt="logo" className="w-44" />
        </a>
        <div className="flex w-[600px]">
          <input
            type="text"
            className="border-2 border-primary text-gray1 rounded-tl rounded-bl p-1 ps-3 w-full outline-none"
            placeholder="Search"
          />
          <button className="bg-primary py-1 px-3 text-white/90 text-xl rounded-tr rounded-br">
            {search}
          </button>
        </div>
        <div className="flex items-center bg-gray1"></div>
      </div>
      <div className="flex items-center bg-primary opacity-95 py-2"></div>
    </header>
  );
};

export default Header;
