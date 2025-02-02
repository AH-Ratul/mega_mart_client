import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/api/products_api";
import { useSelector } from "react-redux";
import Loader from "../../components/Shared/Loader/Loader";

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
    <div className="pt-16 flex justify-center items-center mb-32">
      <div className="flex flex-col h-[450px] w-full lg:flex-row  lg:justify-start lg:w-[960px] xl:w-[1240px] 2xl:w-[1290px]">
        <div className="flex justify-center items-center">
          <img src={productImages} alt="img" className="w- h-80 " />
        </div>
        <div className="mt-2 mx-3">
          <p>{productName}</p>
          <div className="flex justify-between items-center text-xs my-1">
            <span>7 sold</span>
            <span>4.3 ⭐⭐⭐⭐⭐</span>
          </div>
          <p className="font-bold text-lg">&#2547; {price}</p>
          <div className="border rounded-md w-fit flex items-center">
            <button className="bg-gray-100 text-2xl w-9">-</button>
            <span className="mx-3">1</span>
            <button className="bg-gray-100 text-2xl w-9">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
