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
    <header className="lg:hidden fixed top-0 w-screen z-20">
      {/* Top Header */}
      <div className="flex justify-between items-center w-full gap-3 px-4 py-2 bg-[#c82233e6] shadow-md">
        {/* Logo */}
        <div className="flex-shrink-0 w-32 md:w-44">
          <Link to="/">
            <img
              src={logo}
              alt="MegaMart Logo"
              className="h-8 object-contain"
            />
          </Link>
        </div>

        {/* Search */}
        <div className="relative w-96">
          <SearchBox />
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full z-30 flex justify-around items-center py-2 shadow-lg">
        <Link
          to="/"
          className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
          aria-label="Home"
        >
          <span className="text-2xl">{home}</span>
          <span className="text-xs font-medium">Home</span>
        </Link>

        <div>
          <button
            onClick={() => toggle("category")}
            className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
            aria-label="Categories"
          >
            <span className="text-2xl">{list}</span>
            <span className="text-xs font-medium">Categories</span>
          </button>
          <CategorySideBar
            isOpen={toggleStates.category}
            close={() => toggle("category")}
          />
        </div>

        <Link
          to="/shopping_cart"
          className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
          aria-label="Cart"
        >
          <span className="text-2xl">{cart}</span>
          <span className="text-xs font-medium">Cart</span>
        </Link>

        <div>
          <button
            onClick={() => toggle("menu")}
            className="flex flex-col items-center text-gray-600 hover:text-primary transition-colors"
            aria-label="Menu"
          >
            <span className="text-2xl">{menu}</span>
            <span className="text-xs font-medium">Menu</span>
          </button>
          <MenuSideBar
            isOpen={toggleStates.menu}
            close={() => toggle("menu")}
          />
        </div>
      </nav>
    </header>
  );
};

export default HeaderSm;
