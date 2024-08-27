import React from "react";
import logo from "../../../public/logo123.svg";
import { allIcons } from "../../data/all-icons";
import Headlines from "../Headlines/Headlines";
import DropDown from "../Shared/DropDown/DropDown";
import useToggle from "../../hooks/useToggle";
import { Link } from "react-router-dom";
import DropOnHover from "../Shared/DropDown/DropOnHover";

const Header = () => {
  const { account, search, cart3, facebook, insta, email } = allIcons;
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
    <header className="hidden lg:flex flex-col justify-center items-center bg-d1 border-b">
      <div>
        {/* upper div */}
        <div className="flex justify-between items-center  pt-2 text-white/80">
          <div className="flex items-center gap-3 text-sm">
            <a href="">{facebook}</a>
            <a href="">{insta}</a>
            <a href="">{email}</a>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <a href="" className="">
              About Us
            </a>
            <a href="" className="">
              Media
            </a>
            <a href="" className=" ">
              FAQ
            </a>
          </div>
        </div>
        {/* lower div */}
        <div className="py-5 w-full flex justify-between items-center gap-[167px] ">
          <a href="/">
            <img src={logo} alt="logo" className="w-52" />
          </a>
          {/* Search */}
          <div className="flex w-[700px] rounded-md">
            <input
              type="text"
              className=" text-gray1  border border-b1 border-r-0 rounded-tl-md rounded-bl-md py-[6px] ps-3 w-full outline-none text-sm"
              placeholder="Search"
            />
            <button
              onClick={() => console.log("click search")}
              className="bg-primary py-1 px-4 text-white/90 text-xl rounded-tr-md rounded-br-md"
            >
              {search}
            </button>
          </div>
          {/* account & cart */}
          <div className="flex items-center gap-5 ">
            {/* login */}
            <div className="relative group">
              <Link
                to=""
                className="flex items-center text-primary text-2xl h-9"
              >
                {account}
              </Link>
              <DropOnHover />
            </div>

            {/* My Cart */}
            <div className="relative ">
              <button
                onClick={() => toggle("drop")}
                className="flex items-center text-xs text-white/90"
              >
                <span className="text-[1.688rem] text-primary rounded-full">
                  {cart3}
                </span>
              </button>
              <DropDown
                isOpen={toggleStates.drop}
                close={() => toggle("drop")}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
