import React from "react";
import { allIcons } from "../../../data/all-icons";
import p1 from "../../../assets/p1.jpg";

const CartSideBar = ({ isOpen, close }) => {
  const { cross, cart, checkout } = allIcons;
  return (
    <div
      className={`fixed h-[100dvh]  left-0 right-8 text-gray1 bg-white z-20 top-0 px-4 py-3 md:px-7 md:py-4 overflow-hidden inset-y-0 transform ${
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      } transition-transform duration-500 ease-in-out`}
    >
      <div className="flex justify-between items-center border-b-2 pb-4 border-primary">
        <h1 className="text-2xl font-bold text-orange-500">My Cart</h1>
        <span onClick={close} className="hover:text-primary text-black">
          {cross("large")}
        </span>
      </div>
      <div className="mt-5 text-black flex items-center gap-7">
        <img src={p1} alt="" className="w-16" />
        <p>Dell Laptop i5 8th gen.. </p>
        <p className="text-lg">$3000</p>
        <span className="text-sm bg-gray1 text-white px-1">
          {cross("default")}
        </span>
      </div>
      <div className="border-t-2 border-b-2 border-black/40 pb-2 mt-12 text-black">
        <div className="flex justify-between items-center px-3 mt-2">
          <p>Sub-Total</p>
          <p>$3000</p>
        </div>
        <div className="flex justify-between items-center px-3 mt-2">
          <p>Vat(15%)</p>
          <p>$15</p>
        </div>
        <div className="flex justify-between items-center px-3 mt-2">
          <p>Total</p>
          <p>$3015</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-20 mt-7">
        <button className="bg-d1 text-white/90 px-3 py-2">
          {cart("small")} View Cart
        </button>
        <button className="bg-d1 text-white/90 px-3 py-2">
          {checkout("small")} Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSideBar;
