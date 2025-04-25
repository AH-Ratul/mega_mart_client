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
    <div className="pt-20 pb-24 lg:pb-10 mx-auto w-full flex flex-col  items-center h-full">
      <div className="w-full max-w-[1270px] ">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-gray-400 text-sm">
            <li>Home</li>
            <li>{">"}</li>
            <li className="font-medium text-black">Checkout</li>
          </ol>
        </nav>

        {/* main content */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-12  justify-center mt-5">
          <div className="w-full flex flex-col-reverse lg:flex-col">
            {/* Shipping address */}
            <section className="bg-white mx-2 xl:mx-0">
              <p className="bg-gray-100 py-2 ps-3 text-sm font-semibold tracking-wide rounded">
                Shipping Address
              </p>

              {user.addresses.map((address) => (
                <div className="pl-3 mt-3 py-2 border border-dashed border-l-primary rounded text-sm flex flex-col gap-1">
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
            <section className="bg-white lg:mt-5 mb-5 p- mx-2 xl:mx-0 border-t pt-4">
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
            <section>
              <h1 className="font-bold tracking-wide">Payment Methods</h1>
            </section>
          </div>

          {/* Order Summary */}
          <div className="xl:w-[500px] mx-2 xl:mx-0 h-fit">
            <h1 className="font-medium mb-4">Order Summary</h1>
            <section className="flex items-center justify-end">
              <input
                type="text"
                className="border text-sm py-2 ps-4 w-80 outline-none rounded focus:border-black"
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
