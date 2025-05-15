import React, { useState } from "react";
import logo from "../../../public/logo123.svg";
import { allIcons } from "../../data/all-icons";
import { Link } from "react-router-dom";
import DropOnHover from "../Shared/DropDown/DropOnHover";
import CategoryOnHover from "../Shared/DropDown/CategoryOnHover";
import SearchBox from "../SearchBox/SearchBox";

const Header = () => {
  const { account, cart3 } = allIcons;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="hidden lg:flex fixed top-0 w-full z-50 bg-[#c82233e6] border-b border-b-cardinal backdrop-blur-sm">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-10 px-4 xl:px-2">
        {/* LOGO */}
        <a href="/">
          <img src={logo} alt="logo" className="w-44" />
        </a>

        {/* CATEGORY */}
        <div
          className="relative group py-2"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <p className="text-white p-2 hover:bg-black/10 hover:rounded-full cursor-pointer">
            Category
          </p>
          {isOpen && <CategoryOnHover close={() => setIsOpen(false)} />}
        </div>

        {/* SEARCH */}
        <div className="relative">
          <SearchBox />
        </div>

        {/* ACCOUNT & CART */}
        <div className="flex items-center gap-4">
          {/* Account */}
          <div className="relative group py-2">
            <Link
              to=""
              className="flex items-center gap-1 text-white text-2xl h-10 hover:bg-black/10 hover:rounded-full p-3"
            >
              {account}
              <p className="text-xs leading-tight">
                Orders &<br />
                Account
              </p>
            </Link>
            <DropOnHover />
          </div>

          {/* Cart */}
          <div className="relative">
            <Link
              to="/shopping_cart"
              className="flex items-center text-xs text-white/90 hover:bg-black/10 hover:rounded-full p-2"
            >
              <span className="text-[1.688rem] text-white">{cart3}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
