import React from "react";
import { useGetProductsQuery } from "../../redux/api/products_api";
import { useSelector } from "react-redux";
import { allIcons } from "../../data/all-icons";
import { Link } from "react-router-dom";
import Loader from "../Shared/Loader/Loader";

const Products = () => {
  const { cart2 } = allIcons;
  const { data: productsData, isLoading, error } = useGetProductsQuery();
  const { loading } = useSelector((state) => state.products);
  const products = productsData?.data || [];

  if (isLoading && loading) {
    return <Loader size="30px" />;
  }

  if (error) {
    return <p>Error occured to fetch data</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-20 mt-9">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col my-1 border p-1 rounded-md w-fit sm:w-60 shadow-sm hover:shadow-lg relative"
          >
            <Link
              to={`/details/${product._id}/${encodeURIComponent(
                product.productName
              )}`}
            >
              <img
                src={product.productImages}
                alt="img"
                className="h-52 mb-1 rounded-md cursor-pointer"
              />
            </Link>
            <div className=" p-2 w-full">
              <Link
                to={`/details/${product._id}/${encodeURIComponent(
                  product.productName
                )}`}
                className="text-sm hover:text-primary hover:transition hover:duration-300 hover:ease-in-out"
              >
                {product.productName.length > 25
                  ? `${product.productName.slice(0, 25)}...`
                  : product.productName}
              </Link>
              {product.quantity < 5 && product.quantity > 0 ? (
                <p className="text-xs text-primary">
                  Only {product.quantity} left
                </p>
              ) : (
                ""
              )}
              <div className="flex justify-between items-center mt-1 ">
                <p className="font-bold text-sm">&#2547; {product.price}</p>
                <button className="border border-d2 hover:border-primary hover:text-primary rounded-full py-1 px-2 text-xl">
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
