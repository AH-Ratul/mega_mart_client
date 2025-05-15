import React, { useMemo, useState } from "react";
import { useGetCategoryProductsQuery } from "../../redux/api/products_api";
import { Link, useParams } from "react-router-dom";
import Products from "../../components/Products/Products";
import Modal from "../../components/Shared/Modal/Modal";
import Loader from "../../components/Shared/Loader/Loader";
import SortDropDown from "../../components/Shared/DropDown/SortDropDown";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [sortBy, setSortBy] = useState("default");

  const { data, isLoading } = useGetCategoryProductsQuery(categoryName);

  const products = Array.isArray(data) ? data : [];

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    if (sortBy === "price-low-high") {
      sorted.sort(
        (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
      );
    } else if (sortBy === "price-high-low") {
      sorted.sort(
        (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
      );
    }

    return sorted;
  }, [products, sortBy]);

  if (isLoading) {
    return <Modal modal={<Loader size="40px" />} />;
  }

  return (
    <div className="mt-[70px] flex flex-col justify-center items-center px-3">
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
            <li className="font-medium text-gray-800">{categoryName}</li>
          </ol>
        </nav>

        <div className="flex justify-end items-center mb-5">
          {/* Sort Dropdown */}
          <SortDropDown sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        <div className="flex justify-center ">
          <Products customProducts={sortedProducts} />
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
