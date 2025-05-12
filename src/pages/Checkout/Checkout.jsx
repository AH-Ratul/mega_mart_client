import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  useAddedToCartMutation,
  useGetCartQuery,
} from "../../redux/api/cart_api";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { useInitiateOrderMutation } from "../../redux/api/order_api";
import { useGetMeQuery } from "../../redux/api/users_api";
import { setUser } from "../../redux/slices/authSlice";

const Checkout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const localCartItem = useSelector((state) => state.cart.cartItems || []);

  const { data: userInfo } = useGetMeQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const [addedToCart] = useAddedToCartMutation();
  const [initiateOrder, { isLoading }] = useInitiateOrderMutation();

  const user = userInfo?.data;
  dispatch(setUser(user));

  // ref to block double sync
  const hasSynced = useRef(false);

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
  const { data: cartData } = useGetCartQuery(user?._id);

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
  const onSubmitOrder = async () => {
    try {
      const orderData = {
        user: user._id,
        products: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice: total,
        transactionId: `TXN-${Date.now()}`,
        status: "PENDING",
      };

      const res = await initiateOrder(orderData).unwrap();

      if (res.redirectUrl) {
        window.location.href = res.redirectUrl;
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
    }
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

              {user?.addresses?.map((address) => (
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
                onClick={onSubmitOrder}
                className="w-full bg-primary hover:bg-opacity-95 py-2 rounded-sm text-white mt-4"
              >
                {isLoading ? "Processing..." : "Place Order"}
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
