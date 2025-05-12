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
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-20 mt-2">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col w-fit h-[360px] lg:p-2 sm:w-60 lg:shadow-sm lg:hover:shadow-md relative"
          >
            {/* PRODUCT IMAGE */}
            <div className="h-56 flex items-center justify-center overflow-hidden">
              <Link
                to={`/details/${product._id}/${encodeURIComponent(
                  product.productName
                )}`}
                className="block"
              >
                <img
                  src={product.productImages}
                  alt="img"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>

            {/* DETAILS */}
            <div className="w-full">
              <Link
                to={`/details/${product._id}/${encodeURIComponent(
                  product.productName
                )}`}
                className="text-sm hover:text-primary transition duration-300"
              >
                {product.productName.length > 25
                  ? `${product.productName.slice(0, 23)}...`
                  : product.productName}
              </Link>

              {/* Price & Cart Button */}
              <div className="flex justify-between items-center mt-1 ">
                <div className="flex items-center gap-1">
                  {product.discountPrice ? (
                    <>
                      <p className="font-bold text-sm">
                        &#2547; {product.discountPrice}
                      </p>
                      <span className="text-xs text-gray1 line-through hidden lg:block">
                        &#2547; {product.price}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-">
                      &#2547; {product.price}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleClick(product)}
                  className="border border-d2 hover:border-primary hover:text-primary rounded-full py-1 px-2 text-lg transition duration-300"
                >
                  {cart2}
                </button>
              </div>

              {/* Quantity counts */}
              {product.quantity < 5 && product.quantity > 0 ? (
                <p className="text-xs text-primary">
                  Only {product.quantity} left
                </p>
              ) : product.availability === "Out of Stock" ? (
                <p className="text-xs text-red-500">Out of Stock</p>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
