import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/api/products_api";
import { useSelector } from "react-redux";
import Loader from "../../components/Shared/Loader/Loader";
import Products from "../../components/Products/Products";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, isLoading, error } = useGetProductByIdQuery(id);
  const { loading } = useSelector((state) => state.products);
  console.log(id, productData);
  const { productName, productImages, price, discountPrice, description } =
    productData?.data || [];

  if (isLoading && loading) {
    return <Loader size="30px" />;
  }

  if (error) {
    return <p>Error occured to fetch data</p>;
  }

  return (
    <>
      <div className="pt-14 lg:pt-16 flex justify-center items-center mb-32">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-whit overflow-hidden">
          {/* Product Image */}
          <div className="hidden lg:block w-20 h-20 border-2 border-black cursor-pointer mr-1">
            <img
              src={productImages}
              alt={productName}
              className="w-full h-full"
            />
          </div>
          <div className="flex justify-center items-center h-[550px] bg-gray-100 p-4 lg:w-1/2">
            <img
              src={productImages}
              alt={productName}
              className=" w-full h-full object-contain rounded-md"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between px-6 lg:w-1/2">
            <div>
              <h1 className="mb-1 text-xl">{productName}</h1>
              <span className="bg-slate-200 px-1 py-[1px] text-sm font-medium tracking-wide rounded-md">
                Brand: Walton
              </span>
              <div className="flex justify-between items-center text-sm text-gray-500 mt-2 mb-4">
                <span>0 sold</span>
                <span className="flex items-center gap-1">4.3 ⭐⭐⭐⭐⭐</span>
              </div>
              <p className="font-bold text-xl mb-4 flex items-center gap-2">
                {discountPrice ? (
                  <>
                    <span>&#2547; {discountPrice}</span>
                    <span className="text-xs text-gray1 line-through">
                      &#2547; {price}
                    </span>
                  </>
                ) : (
                  <span>&#2547; {price}</span>
                )}
              </p>
              <p className="text-sm text-justify">{description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center border rounded-md w-fit bg-gray-100 mt-2 lg:mt-0">
              <button className="px-4 py-2 text-xl hover:bg-gray-200">-</button>
              <span className="px-4 py-2 text-lg bg-white">1</span>
              <button className="px-4 py-2 text-xl hover:bg-gray-200">+</button>
            </div>

            {/* Add to Cart & Buy Button */}
            <div className="flex items-center gap-5 pb-1">
              <button className="mt-6 w-1/2 border border-black/70 py-3 rounded-full transition-transform duration-300 hover:scale-105">
                Add to Cart
              </button>
              <button className="mt-6 w-1/2 bg-primary text-white py-3 rounded-full transition-transform duration-300 hover:scale-105">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Familiar Items */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-lg">Explore Your interests</h1>
        <Products />
      </div>
    </>
  );
};

export default ProductDetails;
