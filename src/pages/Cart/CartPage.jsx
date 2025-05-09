import React, { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Products from "../../components/Products/Products";
import { useDispatch, useSelector } from "react-redux";
import { allIcons } from "../../data/all-icons";
import { decreaseQnty, removeFromCart } from "../../redux/slices/cartSlice";
import {
  useAddedToCartMutation,
  useDecreaseQuantityMutation,
  useGetCartQuery,
  useRemoveitemMutation,
} from "../../redux/api/cart_api";
import { handleCartToAddedGlobal } from "../../utils/cartUtils";
import Loader from "../../components/Shared/Loader/Loader";
import Modal from "../../components/Shared/Modal/Modal";
import CustomToast from "../../hooks/CustomToast";

const CartPage = () => {
  const { deleted } = allIcons;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localCartItem = useSelector((state) => state.cart.cartItems || []);
  const { user } = useSelector((state) => state.auth);

  // for increase quantity
  const [addedToCart] = useAddedToCartMutation();

  const handleClick = (product) => {
    handleCartToAddedGlobal({ user, product, addedToCart, dispatch });
  };

  // get cart data
  const { data: dbCartData = [], isLoading } = useGetCartQuery(user?._id);

  const cartData = (user ? dbCartData : localCartItem) || [];

  // remove cart data & decrease quantity
  const [removeItem] = useRemoveitemMutation();
  const [decreaseQuantity] = useDecreaseQuantityMutation();

  const handleRemove = async (userId, productId) => {
    if (!user) return dispatch(removeFromCart(productId));
    await removeItem({ userId, productId });
  };

  const handleDecreaseQuantity = async (userId, productId) => {
    if (!user) return dispatch(decreaseQnty(productId));
    await decreaseQuantity({ userId, productId });
  };

  // Scroll to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Total price calculate
  const calculateTotal = () => {
    return cartData.reduce((total, item) => {
      const itemPrice = item.discountPrice ? item.discountPrice : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    if (cartData.length === 0) {
      CustomToast({
        type: "error",
        message: "Please select the item you want to check out",
      });
      return;
    }

    if (user.addresses.length === 0) {
      navigate("/contact_information", { state: { redirectTo: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  if (isLoading) {
    return <Modal modal={<Loader size="40px" />} />;
  }

  return (
    <div className="mt-20 px-3 flex flex-col items-center w-full">
      <div className="w-full max-w-[1270px] ">
        {/* breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-gray-400 text-xs">
            <li>Home</li>
            <li>{">"}</li>
            <li className="font-medium text-black">Cart</li>
          </ol>
        </nav>
        {/* main cart */}
        <div className="flex flex-col lg:flex-row justify-center gap-20 mt-5">
          {/* Cart Items */}
          <div className="w-full h-auto flex flex-col justify-center items-center">
            {cartData.length === 0 ? (
              <>
                <p className="text-lg font-bold">Your Cart is Empty</p>
                <span className="text-xs">Add your favorite item in it</span>
              </>
            ) : (
              <div className="w-full">
                {cartData.map((item) => (
                  <div
                    key={item._id || item.productId}
                    className="flex items-center px-1 py-1  mb-1"
                  >
                    <img
                      src={item.productImages}
                      alt="img"
                      className="h-20 w-20"
                    />
                    <div className="flex flex-col w-full gap-8 ml-5 border-b pb-4">
                      {/* product name & remove button */}
                      <div className="flex items-center justify-between w-full">
                        <p className="text-sm">
                          {item.productName?.length > 100
                            ? `${item.productName.slice(0, 90)}...`
                            : item.productName}
                        </p>
                        <button
                          onClick={() =>
                            handleRemove(user?._id, item.productId)
                          }
                          className="text-red-500 hover:bg-gray-200 p-2 text-lg rounded-full ml-1"
                        >
                          {deleted}
                        </button>
                      </div>

                      {/* Price & Quantity */}
                      <div className="flex items-center justify-between ">
                        <p className="text-primary font-bold">
                          {item.discountPrice ? (
                            <div className="flex items-center gap-3">
                              <p className="font-bold">
                                &#2547; {item.discountPrice}
                              </p>
                              <span className="text-xs text-gray1 line-through hidden lg:block">
                                &#2547; {item.price}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold">
                              &#2547; {item.price}
                            </span>
                          )}
                        </p>

                        {/* Quantity */}
                        <div className="border">
                          <button
                            onClick={() =>
                              handleDecreaseQuantity(user?._id, item.productId)
                            }
                            className="bg-gray-200 px-2"
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            onClick={() => handleClick(item)}
                            className="bg-gray-200 px-2"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:w-[600px] h-auto">
            <h1 className="text-xl">Order Summary</h1>

            <div className="flex justify-between items-center text-xl font-bold my-2">
              <p>Total</p>
              <p>
                <span className="text-xl">&#2547;</span>{" "}
                {calculateTotal().toFixed(2)}
              </p>
            </div>
            {/* link to checkout */}
            <>
              <button
                onClick={handleCheckout}
                className="bg-primary w-full text-center text-white py-2 text-lg rounded mt-3 relative overflow-hidden group"
              >
                <span className="relative inline-block transition-all duration-300 ease-in-out">
                  Checkout <span>({cartData.length})</span>
                </span>

                {/* Blur Effect - Moving from Top to Bottom */}
                <span className="absolute inset-0 bg-white/20 blur-lg scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300 ease-in-out"></span>
              </button>
            </>
          </div>
        </div>

        {/* all products */}
        <div className="mt-28">
          <h1 className="font-medium">Items may you want to add</h1>
          <div>
            <Products />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
