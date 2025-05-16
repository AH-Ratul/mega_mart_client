import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const { user, loading } = useSelector((state) => state.auth);

  // for increase quantity
  const [addedToCart] = useAddedToCartMutation();

  // get cart data
  const { data: dbCartData = [], isLoading } = useGetCartQuery(user?._id, {
    refetchOnMountOrArgChange: true,
  });

  const cartData = (user ? dbCartData : localCartItem) || [];

  // remove cart data & decrease quantity
  const [removeItem] = useRemoveitemMutation();
  const [decreaseQuantity] = useDecreaseQuantityMutation();

  const handleClick = (product) => {
    handleCartToAddedGlobal({ user, product, addedToCart, dispatch });
  };

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

  const handleCheckout = async () => {
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

  if (isLoading || loading) {
    return <Modal modal={<Loader size="40px" />} />;
  }

  return (
    <div className="mt-[70px] px-4 flex flex-col items-center w-full">
      <div className="w-full max-w-7xl">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li className="text-gray-400">&gt;</li>
            <li className="font-medium text-gray-800">Cart</li>
          </ol>
        </nav>

        {/* Main Cart */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full">
            {cartData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl font-semibold text-gray-800">
                  Your Cart is Empty
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Add your favorite items to it
                </p>

                <Link
                  to="/"
                  className="mt-4 inline-block bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartData.map((item) => (
                  <div
                    key={item._id || item.productId}
                    className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={item.productImages}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div className="flex-1 flex flex-col gap-2">
                      {/* Product Name & Remove Button */}
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-800">
                          {item.productName?.length > 60
                            ? `${item.productName.slice(0, 58)}...`
                            : item.productName}
                        </p>
                        <button
                          onClick={() =>
                            handleRemove(user?._id, item.productId)
                          }
                          className="text-red-500 hover:bg-red-100 p-1.5 rounded-full transition-colors"
                          aria-label="Remove item"
                        >
                          {deleted}
                        </button>
                      </div>

                      {/* Price & Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-800">
                            ৳ {item.discountPrice || item.price}
                          </span>

                          {item.discountPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ৳ {item.price}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              handleDecreaseQuantity(user?._id, item.productId)
                            }
                            className="px-2 py-1 text-gray-600 text-base font-medium bg-gray-50 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                            aria-label="Decrease quantity"
                            disabled={item.quantity === 1}
                          >
                            −
                          </button>

                          <span
                            className="w-8 text-center py-1 text-sm font-semibold text-gray-800 bg-white"
                            aria-live="polite"
                          >
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleClick(item)}
                            className="px-2 py-1 text-gray-600 text-base font-medium bg-gray-50 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
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

          {/* Order Summary */}
          {cartData.length > 0 && (
            <div className="lg:w-[400px] bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-4">
                <span>Total</span>
                <span>৳ {calculateTotal().toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors relative overflow-hidden group"
                aria-label={`Checkout ${cartData.length} items`}
              >
                <span className="relative z-10">
                  Checkout ({cartData.length})
                </span>

                <span className="absolute inset-0 bg-white/20 scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-300"></span>
              </button>
            </div>
          )}
        </div>

        {/* Suggested Products */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            You May Also Like
          </h2>
          <Products />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
