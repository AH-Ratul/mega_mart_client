import React from "react";
import logo from "../../assets/logo11.svg";
import { allIcons } from "../../data/all-icons";
import { Link } from "react-router-dom";
import MenuSideBar from "../Shared/Menubar/MenuSideBar";
import useToggle from "../../hooks/useToggle";
import CartSideBar from "../Shared/Cartbar/CartSideBar";

const HeaderSm = () => {
  const { home, cart, search, list, menu } = allIcons;
  const [toggleStates, toggle] = useToggle({
    menu: false,
    cart: false
  }); // custom hook to handle toggle

  return (
    <main className="lg:hidden">
      {/* top header */}
      <div className="flex flex-col justify-center items-center ">
        <div className="w-[45%] md:w-[30%]">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="flex w-full px-3 md:px-9">
          <input
            type="text"
            className="border border-primary p-1 ps-3 w-full outline-none focus:border-secondary focus:border-2"
            placeholder="Search"
          />
          <button className="bg-primary py-1 px-3 text-white/90">
            {search}
          </button>
        </div>
      </div>

      {/* bottom header */}
      <section className="bg-gray-200 py-2 fixed bottom-0 w-[100dvw] z-20 flex justify-between items-center px-8 md:px-12">
        <a href="/" className="text-primary flex flex-col items-center">
          {home}
          <span className="text-xs">Home</span>
        </a>
        <span className="text-gray1 flex flex-col items-center">
          {list}
          <span className="text-xs">Category</span>
        </span>
        {/* cart */}
        <div>
          <button
            onClick={()=> toggle('cart')}
            className="text-gray1 flex flex-col items-center"
          >
            {cart}
            <span className="text-xs">Cart</span>
          </button>
          <CartSideBar isOpen={toggleStates.cart} close={()=> toggle('cart')} />
        </div>
        {/* menu */}
        <div>
          <button
            onClick={()=> toggle('menu')}
            className="text-gray1 flex flex-col items-center"
          >
            {menu}
            <span className="text-xs">Menu</span>
          </button>
          <MenuSideBar isOpen={toggleStates.menu} close={()=> toggle('menu')} />
        </div>
      </section>
    </main>
  );
};

export default HeaderSm;
