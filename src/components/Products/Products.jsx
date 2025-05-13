import React from "react";
import { useGetProductsQuery } from "../../redux/api/products_api";
import { useDispatch, useSelector } from "react-redux";
import { allIcons } from "../../data/all-icons";
import { Link } from "react-router-dom";
import Loader from "../Shared/Loader/Loader";
import { useAddedToCartMutation } from "../../redux/api/cart_api";
import { handleCartToAddedGlobal } from "../../utils/cartUtils";
import CustomToast from "../../hooks/CustomToast";

const Products = () => {
  const { cart2 } = allIcons;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  // cart added to database
  const [addedToCart] = useAddedToCartMutation();
  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsQuery(undefined, { refetchOnMountOrArgChange: true });

  const products = productsData?.data || [];

  const handleClick = (product) => {
    if (product.quantity === 0) {
      CustomToast({
        type: "error",
        message: "Product is Out of Stock, Can't Purchase",
      });
    } else {
      handleCartToAddedGlobal({ product, user, addedToCart, dispatch });
    }
  };

  if (isLoading && loading) {
    return <Loader size="30px" />;
  }

  if (error) {
    return <p>Error occured to fetch data</p>;
  }

  return (
    <div className="mt-4 mb-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col w-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
              <Link
                to={`/details/${product._id}/${encodeURIComponent(
                  product.productName
                )}`}
              >
                <img
                  src={product.productImages}
                  alt={product.productName}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
              {product.quantity < 5 && product.quantity > 0 ? (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Only {product.quantity} left
                </span>
              ) : product.availability === "Out of Stock" ? (
                <span className="absolute top-2 left-2 bg-gray-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  Out of Stock
                </span>
              ) : null}
            </div>

            {/* Product Details */}
            <div className="p-3 flex flex-col gap-1">
              <Link
                to={`/details/${product._id}/${encodeURIComponent(
                  product.productName
                )}`}
                className="text-sm font-medium text-gray-800 hover:text-primary transition-colors"
              >
                {product.productName.length > 25
                  ? `${product.productName.slice(0, 23)}...`
                  : product.productName}
              </Link>

              {/* Price & Cart Button */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">
                    ৳ {product.discountPrice || product.price}
                  </span>
                  {product.discountPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ৳ {product.price}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleClick(product)}
                  className="p-1.5 border border-gray-300 rounded-full text-gray-600 hover:border-primary hover:text-primary transition-colors"
                  aria-label="Add to cart"
                >
                  {cart2}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
