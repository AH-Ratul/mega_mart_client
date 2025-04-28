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
  const { data: productData, isLoading, error } = useGetProductByIdQuery(id);
  const { loading } = useSelector((state) => state.products);
  const { _id, productName, productImages, price, discountPrice, description } =
    productData?.data || [];

  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.quantity.value);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [addedToCart] = useAddedToCartMutation();

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
    navigate(`/checkout`, { state: item });
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
      <div className="mt-[53px] lg:mt-[75px] flex justify-center items-center mb-32">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl overflow-hidden">
          {/* Product Image */}
          <div className="hidden lg:block w-20 h-20 border-2 border-black cursor-pointer mr-1">
            <img
              src={productImages}
              alt={productName}
              className="w-full h-full"
            />
          </div>
          <div className="flex justify-center items-center w-full lg:w-1/2 h-auto lg:h-[550px] overflow-hidden">
            <img
              src={productImages}
              alt={productName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between mt-1 lg:mt-0 px-6 lg:w-1/2">
            <div>
              <h1 className="mb-1 text-xl">{productName}</h1>
              <span className="bg-slate-200 px-1 py-[1px] text-sm font-medium tracking-wide rounded-md">
                Brand: Walton
              </span>
              <div className="flex justify-start items-center gap-4 text-sm text-gray-500 mt-2 mb-4">
                <span>0 sold</span>
                <span className="flex items-center">
                  ⭐⭐⭐⭐⭐ 4.3 Ratings
                </span>
              </div>
              <p className="font-semibold text-xl mb-4 flex items-center gap-2">
                {discountPrice ? (
                  <>
                    <span>&#2547; {discountPrice}</span>
                    <span className="text-base text-gray1 line-through">
                      &#2547; {price}
                    </span>
                  </>
                ) : (
                  <span className="">&#2547; {price}</span>
                )}
              </p>
              <p className="text-sm text-pretty">{description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 w-fit mt-2 lg:mt-0">
              <span className="text-gray-700">Quantity: </span>
              <div className="flex items-center bg-gray-100">
                <button
                  onClick={() => dispatch(decrement())}
                  className={`px-4 text-xl transition ${
                    quantity === 1 ? "cursor-not-allowed" : "hover:bg-gray-200"
                  } `}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <span className="w-10 text-center py-[1px] text-lg bg-white">
                  {quantity}
                </span>
                <button
                  onClick={() => dispatch(increment())}
                  className="px-4 text-xl hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart & Buy Button */}
            <div className="flex items-center gap-5 pb-1">
              <button
                onClick={() => handleAddToCart(productData.data)}
                className="mt-6 w-1/2 border border-black/70 py-3 rounded-lg transition-transform duration-300 hover:scale-105"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuy}
                className="mt-6 w-1/2 bg-primary text-white py-3 rounded-lg transition-transform duration-300 hover:scale-105"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Familiar Items */}
      <div className="flex flex-col items-center mx-2">
        <div className="w-full flex flex-col max-w-[1270px]">
          <h1 className="text-xl mb-4 ml-3">Explore your interests</h1>
          <div className="flex justify-center">
            <Products />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
