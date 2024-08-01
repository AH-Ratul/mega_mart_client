import React from "react";
import logo from "../../../public/logo123.svg";
import { allIcons } from "../../data/all-icons";
import Headlines from "../Headlines/Headlines";
import DropDown from "../Shared/DropDown/DropDown";
import useToggle from "../../hooks/useToggle";
import { Link } from "react-router-dom";
import bonus from "../../assets/bonus.png";

const Header = () => {
  const { account, wish, search, cart3, lock } = allIcons;
  const [toggleStates, toggle] = useToggle({
    drop: false,
  });

  const headlines = [
    "50% off on all products! .....",
    "Free shipping on orders over $50! .....",
    "New collection just arrived! .....",
    "Limited time offer: Buy 1 Get 1 Free! .....",
  ];
  return (
    <header className="hidden lg:block bg-d1">
      {/* upper div */}
      <div className="flex justify-between items-center px-10 py-1 2xl:py-2 border-b border-b-white/10">
        <div>
          <Headlines headlines={headlines} />
        </div>
        <div className="flex items-center text-white/70 text-xs">
          {/* my account */}
          <div className="group relative">
            <Link className="flex items-center mx-3 gap-1 hover:text-white/90">
              {account}MY ACCOUNT
            </Link>
          </div>
          {/* wish list */}
          <Link className="flex items-center mx-3 gap-1 hover:text-white/90">
            {wish} WISH LIST (2)
          </Link>
          {/* login */}
          <Link to='/login' className="flex items-center ml-3 gap-1 hover:text-white/90">
            {lock} LOGIN
          </Link>
        </div>
      </div>
      {/* lower div */}
      <div className="py-3 px-10 flex justify-between items-center">
        <a href="/">
          <img src={logo} alt="logo" className="w-56" />
        </a>
        {/* Search */}
        <div className="flex w-[600px]">
          <input
            type="text"
            className=" text-gray1 rounded-tl rounded-bl py-2 ps-3 w-full outline-none"
            placeholder="Search"
          />
          <button
            onClick={() => console.log("click search")}
            className="bg-primary py-1 px-3 text-white/90 text-xl rounded-tr rounded-br"
          >
            {search}
          </button>
        </div>
        {/* banner & cart */}
        <div className="flex items-center gap-5">
          {/* bonus banner */}
          <div className="w-60">
            <img src={bonus} alt="bonus" />
          </div>
          {/* My Cart */}
          <div className="relative">
            <button
              onClick={() => toggle("drop")}
              className="flex items-center text-xs text-white/90 gap-2"
            >
              <span className="text-2xl  border border-primary text-primary rounded-full p-[6px]">
                {cart3}
              </span>
            </button>
            <DropDown isOpen={toggleStates.drop} close={() => toggle("drop")} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
