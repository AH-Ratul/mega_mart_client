import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/api/products_api";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, isLoading, error } = useGetProductByIdQuery(id);
  const { loading } = useSelector((state) => state.products);
  console.log(id, productData);
  const { productName, productImages, price, discountPrice, description } =
    productData?.data || [];

  if (isLoading && loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occured to fetch data</p>;
  }

  return (
    <div className="pt-24 flex justify-center items-center">
      <div className="flex justify-start gap-20 h-[450px] w-full mx-5 lg:w-[960px] xl:w-[1240px] 2xl:w-[1290px]">
        <div>
          <img src={productImages} alt="img" className="w-96 md:h-96 " />
        </div>
        <div className="">
          <p>{productName}</p>
          <p className="font-bold text-xl">&#2547; {price}</p>
          <p className="text-xs w-96 text-pretty my-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
