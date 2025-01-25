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
    <header className="hidden lg:flex flex-col justify-center items-center bg-cardinal ">
      <div>
        {/* upper div */}

        {/* lower div */}
        <div className="py-2 w-full flex justify-between items-center gap-[160px] ">
          <a href="/">
            <img src={logo} alt="logo" className="w-40" />
          </a>
          <div>
            <p className="text-white p-2 hover:bg-black/10 hover:rounded-full cursor-pointer">
              Category
            </p>
          </div>
          {/* Search */}
          <div className="flex w-[400px] rounded-md relative items-center">
            <input
              type="text"
              className=" text-gray1 rounded-2xl  py-2 ps-3 w-full outline-none text-sm"
              placeholder="Search"
            />
            <button
              onClick={() => console.log("click search")}
              className="bg-black/95 hover:bg-black/70 p-[6.5px] me-[2px] text-white/90 text-xl rounded-full absolute right-0"
            >
              {search}
            </button>
          </div>
          {/* account & cart */}
          <div className="flex items-center gap-2 ">
            {/* login */}
            <div className="relative group">
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

            {/* My Cart */}
            <div className="relative ">
              <button
                onClick={() => toggle("drop")}
                className="flex items-center text-xs text-white/90 hover:bg-black/10 hover:rounded-full p-2"
              >
                <span className="text-[1.688rem] text-white rounded-full">
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
