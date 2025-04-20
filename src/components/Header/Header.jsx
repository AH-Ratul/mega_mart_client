import React, { useState } from "react";
import logo from "../../../public/logo123.svg";
import { allIcons } from "../../data/all-icons";
import { Link, useNavigate } from "react-router-dom";
import DropOnHover from "../Shared/DropDown/DropOnHover";
import CategoryOnHover from "../Shared/DropDown/CategoryOnHover";
import Modal from "../Shared/Modal/Modal";
import Loader from "../Shared/Loader/Loader";

const Header = () => {
  const { account, search, cart3 } = allIcons;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCartClick = () => {
    
      window.location.href = "/shopping_cart";
      console.log("ci");
    
  };

  return (
    <header className="hidden fixed w-screen z-10 top-0 lg:flex justify-center items-center bg-[#c82233e6]  border-b-cardinal border-b backdrop-blur-sm">
      <div>
        {/* lower div */}
        <div className=" w-full flex justify-between items-center lg:gap-16 xl:gap-[170px] 2xl:gap-[180px]">
          {/* LOGO */}
          <a href="/">
            <img src={logo} alt="logo" className="w-44" />
          </a>

          {/* CATEGORY */}
          <div className="relative group py-2">
            <p className="text-white p-2 hover:bg-black/10 hover:rounded-full cursor-pointer">
              Category
            </p>
            <CategoryOnHover />
          </div>

          {/* SEARCH */}
          <div className="flex w-[360px] rounded-md relative items-center">
            <input
              type="text"
              className="text-gray1 rounded-2xl  py-[9px] ps-3 w-full outline-none text-sm"
              placeholder="Search"
            />
            <button
              onClick={() => console.log("click search")}
              className="bg-black/95 hover:bg-black/70 px-2 py-[6.5px] me-[2px] text-white/90 text-xl rounded-full absolute right-0"
            >
              {search}
            </button>
          </div>

          {/* ACCOUNT & CART */}
          <div className="flex items-center gap-2 ">
            {/* login */}
            <div className="relative group py-2">
              <Link
                to=""
                className="flex items-center gap-1 text-white text-2xl h-10 hover:bg-black/10 hover:rounded-full p-3"
              >
                {account}
                <p className="text-xs">
                  Orders & <br />
                  Account
                </p>
              </Link>
              <DropOnHover />
            </div>

            {/* CART */}
            <div className="relative ">
              
              <button
                onClick={handleCartClick}
                className="flex items-center text-xs text-white/90 hover:bg-black/10 hover:rounded-full p-2"
              >
                <span className="text-[1.688rem] text-white rounded-full">
                  {cart3}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
