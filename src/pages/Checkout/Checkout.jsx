import React from "react";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="pt-20 pb-10 mx-auto w-full flex justify-center items-center bg-gray-100 h-full">
      <div className="w-full max-w-[1270px] flex gap-4">
        <div className="w-full">
          <section className="bg-white ">
            <p className="bg-gray-50 py-2 ps-3 text-sm font-medium">
              Add Shipping Address
            </p>
            <div className="px-3 py-2 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Fullname"
                className="border text-sm py-2 ps-2 focus:border-secondary outline-none"
                required
              />
              <input
                type="number"
                placeholder="Phone Number"
                className="border text-sm py-2 ps-2 focus:border-secondary outline-none"
                required
              />
              <input
                type="text"
                placeholder="Address: House# 23, Street# 3, ABC road"
                className="border text-sm py-2 ps-2 focus:border-secondary outline-none"
                required
              />
              <textarea
                name=""
                id=""
                placeholder="Order note (optional)"
                className="border p-2 text-sm focus:border-secondary outline-none"
              />
            </div>
          </section>
          <section className="bg-white mt-5 p-3">
            <div className="flex border-b pb-1">
              <img
                src={data.productImages[0]}
                alt="img"
                className="w-20 h-20"
              />
              <div className="ml-3">
                <p className="text-wrap">{data.productName}</p>
                <div className="flex gap-8 mt-6 text-sm">
                  {data.discountPrice ? (
                    <p>
                      Price: <span>&#2547;</span> {data.discountPrice}
                    </p>
                  ) : (
                    <p>
                      Price: <span>&#2547;</span> {data.price}
                    </p>
                  )}
                  <p>Quantity: {data.quantity}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/*  */}
        <div className="w-[600px] bg-white p-3 shadow-sm h-fit">
          <section className="flex items-center">
            <input
              type="text"
              className="border text-sm py-2 ps-2 w-80 outline-none focus:border-secondary"
              placeholder="Coupon Code"
            />
            <button className="bg-secondary py-2 px-5 text-white ml-2 rounded">
              Apply
            </button>
          </section>
          <section className="mt-7">
            <h1>Order Summary</h1>
            <div className="flex justify-between items-center mt-3">
              <p className="text-black/60 text-sm">Items Total (0 Items)</p>
              <p>
                <span>&#2547;</span> 21
              </p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-black/60 text-sm">Delivary Fee</p>
              <p>
                <span>&#2547;</span> 50
              </p>
            </div>
            <div className=" flex justify-between items-center border-t mt-5 pt-3 px-1">
              <p>Total</p>
              <p className="text-secondary text-lg">
                <span>&#2547;</span> 71
              </p>
            </div>
            <button className="w-full bg-primary py-2 rounded-sm text-white mt-4">
              Proceed to Pay
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
