import React from "react";
import { useForm } from "react-hook-form";
import { useAddContactMutation } from "../../redux/api/contact_api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../../components/Shared/Modal/Modal";
import Loader from "../../components/Shared/Loader/Loader";

const ContactInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [addContact, { isLoading }] = useAddContactMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addContact({ userId: user._id, ...data });

      const redirectTo = location.state.redirectTo || "/";
      const item = location.state.item;
      navigate(redirectTo, { state: item });

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Modal modal={<Loader size="30px" />} />;
  }

  return (
    <div className="pt-[70px] pb-24 lg:pb-10 mx-auto w-full flex flex-col items-center min-h-screen">
      <div className="w-full max-w-7xl px-5 lg:px-0">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li className="text-gray-400">&gt;</li>
            <li className="font-medium text-gray-800">Contact Information</li>
          </ol>
        </nav>

        {/* Info Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
            <div className="w-full lg:w-2/3 flex flex-col gap-6">
              <h1 className="text-lg lg:text-xl font-medium text-gray-800 mb-5 border-b border-primary pb-2">
                Shipping Address
              </h1>

              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="fullname"
                  className="text-sm lg:text-base font-medium text-gray-700"
                >
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Mr. ABC"
                  {...register("fullname", {
                    required: "Name is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm lg:text-base focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300"
                />
                {errors.fullname && (
                  <p className="text-red-500 text-xs lg:text-sm mt-1">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="phone"
                  className="text-sm lg:text-base font-medium text-gray-700"
                >
                  Phone <span className="text-primary">*</span>
                </label>
                <input
                  type="number"
                  id="phone"
                  placeholder="012XXXXXXXX"
                  {...register("phone", {
                    required: "Phone is required",
                    minLength: {
                      value: 11,
                      message: "Enter a valid phone number",
                    },
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm lg:text-base focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs lg:text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="address"
                  className="text-sm lg:text-base font-medium text-gray-700"
                >
                  Address <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="House# 23, Street# 3, ABC road, Kazipara"
                  {...register("address", {
                    required: "Address must required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm lg:text-base focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs lg:text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                {/* Area */}
                <div className="flex flex-col gap-1 w-full sm:w-1/2">
                  <label
                    htmlFor="area"
                    className="text-sm lg:text-base font-medium text-gray-700"
                  >
                    Area <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="area"
                    placeholder="Mirpur"
                    {...register("area", {
                      required: "Area is required",
                    })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm lg:text-base focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300"
                  />
                  {errors.area && (
                    <p className="text-red-500 text-xs lg:text-sm mt-1">
                      {errors.area.message}
                    </p>
                  )}
                </div>

                {/* District */}
                <div className="flex flex-col gap-1 w-full sm:w-1/2">
                  <label
                    htmlFor="district"
                    className="text-sm lg:text-base font-medium text-gray-700"
                  >
                    District <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="district"
                    placeholder="Dhaka"
                    {...register("district", {
                      required: "District is required",
                    })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm lg:text-base focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300"
                  />
                  {errors.district && (
                    <p className="text-red-500 text-xs lg:text-sm mt-1">
                      {errors.district.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Note */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="orderNote"
                  className="text-sm lg:text-base font-medium text-gray-700"
                >
                  Order Note
                </label>
                <textarea
                  name="orderNote"
                  id="orderNote"
                  placeholder="(optional)"
                  {...register("orderNote")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm lg:text-base focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all duration-300 resize-y min-h-[100px]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full lg:w-1/3 flex flex-col items-center  mt-6 lg:mt-0">
              <input
                type="submit"
                value={
                  isLoading ? "Processing to Payment..." : "Continue to Payment"
                }
                disabled={isLoading}
                className="w-full max-w-[400px] bg-primary hover:opacity-80 rounded-full py-3 text-white text-base transition-all duration-300 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              />
              <p className="text-green-600 text-xs mt-3 text-center ">
                We protect your payment information with top-tier security
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactInfo;
