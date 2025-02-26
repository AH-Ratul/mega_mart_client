import React from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  return (
    <div className="mt-20 px-3 flex flex-col items-center w-full">
      <div className="w-full max-w-[1270px] ">
        <span>Home {">"} Cart</span>
        <div className="flex justify-center gap-4 mt-5">
          <div className="w-full h-auto flex flex-col justify-center items-center">
            <p className="text-lg font-bold">Your Cart is Empty</p>
            <span className="text-xs">Add your favorite item in it</span>

            <div>
              <h1>Items may you want to add</h1>
            </div>
          </div>

          {/* Order summary */}
          <div className="w-[600px] h-auto">
            <h1 className="font-bold">Order Summary</h1>
            <div className="flex justify-between items-center">
              <p>Price</p>
              <p>
                <span className="text-3xl">&#2547;</span> 0.00
              </p>
            </div>
            <div className="flex justify-between items-center text-xl font-bold my-2">
              <p>Total</p>
              <p>
                <span className="text-3xl">&#2547;</span> 0.00
              </p>
            </div>
            <Link>
              <button className="bg-primary w-full flex-1 text-white py-2 text-lg rounded-lg mt-3">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
