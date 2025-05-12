import React from "react";
import { useForm } from "react-hook-form";
import { useAddContactMutation } from "../../redux/api/contact_api";
import { useLocation, useNavigate } from "react-router-dom";
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

  console.log("loc", location);

  const onSubmit = async (data) => {
    await addContact({ userId: user._id, ...data });
    const redirectTo = location.state.redirectTo || "/";
    const item = location.state.item;
    navigate(redirectTo, { state: item });

    reset();
  };

  if(isLoading) {
    return <Modal modal={<Loader size="30px" />} />
  }


  return (
    <div className="mt-20 pb-24 lg:pb-10 mx-auto w-full flex flex-col  items-center h-full">
      <div className="w-full max-w-[1270px] px-5 lg:px-0">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-gray-400 text-xs">
            <li>Home</li>
            <li>{">"}</li>
            <li className="font-medium text-black">Contact Information</li>
          </ol>
        </nav>

        {/* info form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10">
            <div className="w-full flex flex-col gap-3">
              <h1 className="font-bold mb-3">Shipping Address</h1>

              {/* full name */}
              <label htmlFor="fullname" className="text-sm">
                FullName <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Mr. ABC"
                {...register("fullname", {
                  required: "Name is required",
                })}
                className="border text-sm py-2 ps-3 focus:border-secondary outline-none"
              />
              {errors.fullname && (
                <p className="text-red-600 text-xs">
                  {errors.fullname.message}
                </p>
              )}

              {/* Phone */}
              <label htmlFor="phone" className="text-sm">
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
                className="border text-sm py-2 ps-3 focus:border-secondary outline-none"
              />
              {errors.phone && (
                <p className="text-red-600 text-xs">{errors.phone.message}</p>
              )}

              {/* Address */}
              <label htmlFor="address" className="text-sm">
                Address <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                placeholder="House# 23, Street# 3, ABC road, Kazipara"
                {...register("address", {
                  required: "Address must required",
                })}
                className="border text-sm py-2 ps-3 focus:border-secondary outline-none"
              />
              {errors.address && (
                <p className="text-red-600 text-xs">{errors.address.message}</p>
              )}

              <div className="flex  gap-12 w-full">
                {/* AREA */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="area" className="text-sm">
                    Area <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Mirpur"
                    {...register("area", {
                      required: "Area is required",
                    })}
                    className="border text-sm py-2 ps-3 focus:border-secondary outline-none"
                  />
                  {errors.area && (
                    <p className="text-red-600 text-xs">
                      {errors.area.message}
                    </p>
                  )}
                </div>

                {/* DISTRICT */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="district" className="text-sm">
                    District <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Dhaka"
                    {...register("district", {
                      required: "District is required",
                    })}
                    className="border text-sm py-2 ps-3 focus:border-secondary outline-none"
                  />
                  {errors.district && (
                    <p className="text-red-600 text-xs">
                      {errors.district.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ORDER NOTE */}
              <label htmlFor="orderNote" className="text-sm">
                Order Note
              </label>
              <textarea
                name="orderNote"
                id="orderNote"
                placeholder="(optional)"
                {...register("orderNote")}
                className="border p-2 text-sm focus:border-secondary outline-none"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div>
              <input
                type="submit"
                value={isLoading ? "Processing..." : "Continue to Payment"}
                disabled={isLoading}
                className="w-[370px] sm:w-[400px] bg-primary rounded-full py-3 text-white cursor-pointer"
              />
              <p className="text-[#0A8800] text-sm ml-3 mt-5 font-semibold">
                We protect your payment information
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactInfo;
