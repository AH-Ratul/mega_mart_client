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
  console.log(products);

  if (isLoading && loading) {
    return <Loader size="30px" />;
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-20 mt-9">
        {products.map((product) => (
          <div className="flex flex-col my-1 border p-1 rounded-md w-fit sm:w-60 hover:shadow-lg relative">
            <img
              src={product.productImages}
              alt="img"
              className="h-64 mb-2 rounded-md cursor-pointer border-b"
            />
            <div className="absolut bottom-0 p-2 w-full">
              <Link className="text-sm hover:text-primary hover:transition hover:duration-300 hover:ease-in-out">
                {product.productName.length > 25
                  ? `${product.productName.slice(0, 25)}...`
                  : product.productName}
              </Link>
              <div className="flex justify-between items-center mt-3 ">
                <p className="font-bold">&#2547; {product.price}</p>
                <button className="border border-d2 rounded-full p-1 text-xl">
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
