import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/api/products_api";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Shared/Loader/Loader";
import Products from "../../components/Products/Products";
import { decrement, increment } from "../../redux/slices/quantitySlice";
import CustomToast from "../../hooks/CustomToast";
import { handleCartToAddedGlobal } from "../../utils/cartUtils";
import { useAddedToCartMutation } from "../../redux/api/cart_api";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quantity = useSelector((state) => state.quantity.value);
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.products);

  const [addedToCart] = useAddedToCartMutation();
  const {
    data: productData,
    isLoading,
    error,
  } = useGetProductByIdQuery(id, { refetchOnMountOrArgChange: true });

  const {
    _id,
    productName,
    productImages,
    price,
    discountPrice,
    description,
    category,
  } = productData?.data || [];

  const handleAddToCart = (product) => {
    if (product.quantity === 0) {
      CustomToast({
        type: "error",
        message: "Product is Out of Stock, Can't Purchase",
      });
    } else {
      handleCartToAddedGlobal({ product, user, addedToCart, dispatch });
    }
  };

  const handleBuy = () => {
    const item = {
      _id,
      productName,
      productImages,
      price,
      discountPrice,
      quantity,
    };

    if (user?.addresses?.length === 0) {
      navigate("/contact_information", {
        state: { redirectTo: "/checkout", item: item },
      });
    } else {
      navigate("/checkout", { state: item });
    }
  };

  // Scrolls to the top when navigating to a new product detail page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (isLoading && loading) {
    return <Loader size="30px" />;
  }

  if (error) {
    return <p>Error occured to fetch data</p>;
  }

  return (
    <>
      <div className="mt-12 lg:mt-16 mb-20 max-w-7xl mx-auto px-4">
        {/* Product Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[450px] aspect-square overflow-hidden">
              <img
                src={productImages}
                alt={productName}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col gap-4 px-4 lg:px-0">
            <h1 className="text-2xl font-bold text-gray-800">{productName}</h1>

            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center">⭐ 4.3 (Ratings)</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold text-gray-800">
                ৳ {discountPrice || price}
              </span>
              {discountPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ৳ {price}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600">Category: {category}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-600">Qty:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => dispatch(decrement())}
                  disabled={quantity === 1}
                  className="px-3 py-1.5 text-gray-600 text-lg font-medium bg-gray-50 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span
                  className="w-10 text-center py-1.5 text-base font-semibold text-gray-800 bg-white"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => dispatch(increment())}
                  className="px-3 py-1.5 text-gray-600 text-lg font-medium bg-gray-50 hover:bg-gray-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleAddToCart(productData.data)}
                className="flex-1 py-2.5 border border-gray-700 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition-colors"
                aria-label="Add to cart"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuy}
                className="flex-1 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                aria-label="Buy now"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Familiar Items */}
        <div className="mt-12 px-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Explore Similar Items
          </h2>
          <div className="w-full">
            <Products />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
