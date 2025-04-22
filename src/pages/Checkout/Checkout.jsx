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
  const onSubmitOrder = () => {
    handleSubmit((formData) => {
      const orderData = {
        ...formData,
        items,
        orderSummary: {
          itemsTotal,
          shippingCharge,
          total,
        },
      };

      console.log("order", orderData);
      reset();
    })();
  };

  if (!cartData) {
    return <p>no data found</p>;
  }

  return (
    <div className="pt-20 pb-24 lg:pb-10 mx-auto w-full flex justify-center items-center bg-gray-100 h-full">
      <div className="w-full max-w-[1270px] flex gap-4  flex-col lg:flex-row ">
        <div className="w-full flex flex-col-reverse lg:flex-col">
          <section className="bg-white mx-2 xl:mx-0">
            <p className="bg-gray-50 py-2 ps-3 text-sm font-medium">
              Add Shipping Address
            </p>
            <form
              onSubmit={handleSubmit(onSubmitOrder)}
              className="px-3 py-2 flex flex-col gap-3"
            >
              <input
                type="text"
                id="fullname"
                placeholder="Fullname: Mr. ABC"
                {...register("fullname", {
                  required: "Name is required",
                })}
                className="border text-sm py-2 ps-2 focus:border-secondary outline-none"
              />
              {errors.fullname && (
                <p className="text-red-600 text-xs">
                  {errors.fullname.message}
                </p>
              )}
              <input
                type="number"
                id="phone"
                placeholder="Phone Number: 012XXXXXXXX"
                {...register("phone", {
                  required: "Phone is required",
                  minLength: {
                    value: 11,
                    message: "Enter a valid phone number",
                  },
                })}
                className="border text-sm py-2 ps-2 focus:border-secondary outline-none"
              />
              {errors.phone && (
                <p className="text-red-600 text-xs">{errors.phone.message}</p>
              )}
              <input
                type="text"
                id="email"
                placeholder="Email: user@email.com"
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="border text-sm py-2 ps-2 focus:border-secondary outline-none"
              />
              {errors.email && (
                <p className="text-red-600 text-xs">{errors.email.message}</p>
              )}
              <input
                type="text"
                placeholder="Address: House# 23, Street# 3, ABC road"
                {...register("address", {
                  required: "Address must required",
                })}
                className="border text-sm py-2 ps-2 focus:border-secondary outline-none"
              />
              {errors.address && (
                <p className="text-red-600 text-xs">{errors.address.message}</p>
              )}
              <textarea
                name="orderNote"
                id="orderNote"
                placeholder="Order note (optional)"
                {...register("orderNote")}
                className="border p-2 text-sm focus:border-secondary outline-none"
              />
            </form>
          </section>

          {/* selected items */}
          <section className="bg-white lg:mt-5 mb-5 p-3 mx-2 xl:mx-0">
            {isLoading && <Loader size="30px" />}
            {items?.map((item) => (
              <div key={item._id} className="flex border-b pt-3 pb-3">
                <img
                  src={item.productImages[0]}
                  alt="img"
                  className="w-20 h-20"
                />
                <div className="ml-3">
                  <p className="text-wrap">{item.productName}</p>
                  <div className="flex gap-8 mt-6 text-sm">
                    <p>
                      Price: <span>&#2547;</span> {item.price}
                    </p>

                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Order Summary */}
        <div className="xl:w-[600px] bg-white p-3 mx-2 xl:mx-0 shadow-sm h-fit">
          <section className="flex items-center justify-end">
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
              <p className="text-black/60 text-sm">Items Total</p>
              <p>
                <span>&#2547;</span> {itemsTotal}
              </p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <p className="text-black/60 text-sm">Shipping Charge</p>
              <p>
                <span>&#2547;</span> {shippingCharge}
              </p>
            </div>
            <div className=" flex justify-between items-center border-t mt-5 pt-3 px-1">
              <p>Total</p>
              <p className="text-secondary text-lg">
                <span>&#2547;</span> {total}
              </p>
            </div>
            <button
              onClick={onSubmitOrder}
              className="w-full bg-primary hover:bg-opacity-95 py-2 rounded-sm text-white mt-4"
            >
              Proceed to Pay
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
