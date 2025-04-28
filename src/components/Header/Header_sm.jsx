import React from "react";
import logo from "../../../public/logo123.svg";
import { allIcons } from "../../data/all-icons";
import MenuSideBar from "../Shared/Menubar/MenuSideBar";
import useToggle from "../../hooks/useToggle";
import CategorySideBar from "../Shared/Category/CategorySideBar";
import { Link } from "react-router-dom";
import SearchBox from "../SearchBox/SearchBox";

const HeaderSm = () => {
  const { home, cart, list, menu } = allIcons;
  const [toggleStates, toggle] = useToggle({
    category: false,
    menu: false,
    cart: false,
  }); // custom hook to handle toggle

  return (
    <header className="lg:hidden">
      {/* top header */}
      <div className="flex justify-center items-center gap-3 px-3 py-2 bg-[#c82233e6] fixed z-10 top-0 w-screen">
        {/* LOGO */}
        <div className="w-[55%]">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>

        {/* SEARCH */}
        <div className="relative w-screen">
          <SearchBox />
        </div>
      </div>

      {/* bottom header */}
      <section className="bg-gray-200 py-2 fixed bottom-0 w-[100dvw] z-20 flex justify-between items-center px-8 md:px-12">
        <a
          href="/"
          className="text-primary text-2xl flex flex-col items-center"
        >
          {home}
          <span className="text-xs">Home</span>
        </a>

        {/* category */}
        <div>
          <button
            onClick={() => toggle("category")}
            className="text-gray1 text-2xl hover:text-secondary flex flex-col items-center"
          >
            {list}
            <span className="text-xs">Categories</span>
          </button>
          <CategorySideBar
            isOpen={toggleStates.category}
            close={() => toggle("category")}
          />
        </div>

        {/* cart */}
        <div>
          <Link
            to="/shopping_cart"
            className="text-gray1 text-2xl hover:text-secondary flex flex-col items-center"
          >
            {cart}
            <span className="text-xs">Cart</span>
          </Link>
        </div>

        {/* menu */}
        <div>
          <button
            onClick={() => toggle("menu")}
            className="text-gray1 text-2xl hover:text-secondary flex flex-col items-center"
          >
            {menu}
            <span className="text-xs">Menu</span>
          </button>
          <MenuSideBar
            isOpen={toggleStates.menu}
            close={() => toggle("menu")}
          />
        </div>
      </section>
    </header>
  );
};

export default HeaderSm;
