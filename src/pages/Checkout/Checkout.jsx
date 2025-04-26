import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import {
  useAddedToCartMutation,
  useGetCartQuery,
} from "../../redux/api/cart_api";
import Loader from "../../components/Shared/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import card from "../../../public/card.png";
import cash from "../../../public/cash.png";

const Checkout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const localCartItem = useSelector((state) => state.cart.cartItems || []);
  const { user } = useSelector((state) => state.auth);

  const [addedToCart] = useAddedToCartMutation();

  // ref to block double sync
  const hasSynced = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Sync guest cart to DB after login
  useEffect(() => {
    const syncCart = async () => {
      if (user && localCartItem.length > 0 && !hasSynced.current) {
        hasSynced.current = true; // prevent future syncs
        try {
          for (const item of localCartItem) {
            await addedToCart({ userId: user._id, ...item }).unwrap();
          }
          dispatch(clearCart());
        } catch (error) {
          console.log("sync fail", error);
        }
      }
    };

    syncCart();
  }, [user, localCartItem, addedToCart, dispatch]);

  const data = location.state;
  const { data: cartData, isLoading } = useGetCartQuery(user?._id);

  const items = data
    ? [
        {
          productId: data._id,
          productName: data.productName,
          productImages: data.productImages,
          price: data.discountPrice || data.price,
          quantity: data.quantity,
        },
      ]
    : cartData?.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        productImages: item.productImages,
        price: item.discountPrice || item.price,
        quantity: item.quantity,
      }));

  // total calculation
  const itemsTotal = items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharge = 50;
  const total = itemsTotal + shippingCharge;

  // handle checkout data to submit
  const onSubmitOrder = (data) => {
    console.log("order", {
      address: user.addresses,
      items,
      paymentMethod: data.paymentMethod,
    });
  };

  if (!cartData) {
    return <p>no data found</p>;
  }

  return (
    <div className="pt-20 pb-24 lg:pb-10 px-3 lg:px-0 mx-auto w-full flex flex-col  items-center h-full">
      <div className="w-full max-w-[1270px] ">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-gray-400 text-xs">
            <li>Home</li>
            <li>{">"}</li>
            <li className="font-medium text-black">Checkout</li>
          </ol>
        </nav>

        {/* main content */}
        <div className="flex flex-col md:flex-row gap-4 lg:gap-12  justify-center mt-5">
          <div className="w-full flex flex-col">
            {/* Shipping address */}
            <section className="bg-white mx-2 xl:mx-0">
              <p className="bg-gray-100 py-2 ps-3 text-sm font-semibold tracking-wide rounded">
                Shipping Address
              </p>

              {user.addresses.map((address) => (
                <div className="p-3 mt-3 border-2 border-dashed border-l-primary rounded text-sm flex flex-col gap-1">
                  <div className="flex items-center gap-5">
                    <p>{address.fullname}</p>
                    <p>+880 {address.phone}</p>
                  </div>
                  <p className="text-primary">{address.address}</p>
                  <p>{address.area}</p>
                  <p>{address.district}</p>
                </div>
              ))}
            </section>

            {/* selected items */}
            <section className="bg-white mt-6 mb-10 mx-2 xl:mx-0 border-t pt-4">
              {isLoading && <Loader size="30px" />}
              {items?.map((item) => (
                <div key={item._id} className="flex pt-3 pb-3 border-b">
                  <img
                    src={item.productImages[0]}
                    alt="img"
                    className="w-24 h-24 bg-gray-500"
                  />
                  <div className="ml-5">
                    <p className="text-wrap">{item.productName}</p>
                    <div className="flex gap-8 mt-12 text-sm">
                      <p>
                        Price: <span>&#2547;</span> {item.price}
                      </p>

                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* payment methods */}
            <section className="mt-6">
              <h1 className="font-bold text-lg tracking-wide mb-4">
                Payment Methods
              </h1>

              <div className="flex flex-col gap-4">
                {/* Card Option */}
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="radio"
                    value="card"
                    {...register("paymentMethod", {
                      required: "Please select a payment method",
                    })}
                    className="peer hidden"
                  />

                  <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center peer-checked:border-gray-900 peer-checked:border-[6px] transition">
                    <div className="w-2.5 h-2.5 bg-gray-900 rounded-full opacity-0 peer-checked:opacity-100 transition-all duration-300" />
                  </div>

                  <span className="text-gray-700 font-medium flex items-center gap-5">
                    {" "}
                    <img src={card} alt="" className="h-8" />
                    Card
                  </span>
                </label>

                {/* Cash Option */}
                <label className="flex items-center gap-4 cursor-pointer">
                  <input
                    type="radio"
                    value="cash"
                    {...register("paymentMethod", {
                      required: "Please select a payment method",
                    })}
                    className="peer hidden"
                  />

                  <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center peer-checked:border-gray-900 peer-checked:border-[6px] transition">
                    <div className="w-2.5 h-2.5 bg-gray-900 rounded-full opacity-0 peer-checked:opacity-100 transition-all duration-150" />
                  </div>

                  <span className="text-gray-700 font-medium flex items-center gap-5">
                    {" "}
                    <img src={cash} alt="" className="h-9" />
                    Cash on Delivary
                  </span>
                </label>
              </div>

              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.paymentMethod.message}
                </p>
              )}
            </section>
          </div>

          {/* Order Summary */}
          <div className="md:w-80 xl:w-[500px] mx-2 xl:mx-0 h-fit mt-10 md:mt-0">
            <h1 className="font-medium mb-4">Order Summary</h1>
            <section className="flex items-center justify-start">
              <input
                type="text"
                className="border text-sm py-2 ps-4 w-full md:w-44 xl:w-80 outline-none rounded focus:border-black"
                placeholder="Coupon Code"
              />
              <button className="py-2 px-5 ml-3 font-semibold border border-black/50 hover:outline hover:outline-1 text-sm rounded-full">
                Apply
              </button>
            </section>
            <section className="mt-7 border-t">
              <div className="flex justify-between items-center mt-3 text-sm">
                <p>Items Total</p>
                <p>
                  <span>&#2547;</span> {itemsTotal}
                </p>
              </div>
              <div className="flex justify-between items-center mt-3 text-sm">
                <p>Shipping Charge</p>
                <p>
                  <span>&#2547;</span> {shippingCharge}
                </p>
              </div>
              <div className="flex justify-between items-center border-t mt-5 pt-3">
                <p>Total</p>
                <p className="text-lg">
                  <span>&#2547;</span> {total}
                </p>
              </div>
              <button
                onClick={handleSubmit(onSubmitOrder)}
                className="w-full bg-primary hover:bg-opacity-95 py-2 rounded-sm text-white mt-4"
              >
                Submit Order
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
