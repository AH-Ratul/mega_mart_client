import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../redux/api/users_api";
import { useDispatch } from "react-redux";
import CustomToast from "../../hooks/CustomToast";
import Loader from "../../components/Shared/Loader/Loader";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [sendEmail, { isLoading, error }] = useForgetPasswordMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await sendEmail(data).unwrap();

      CustomToast({ type: "success", message: result.message });
      reset();
      navigate("/verifyCode");
    } catch (error) {
      error && CustomToast({ type: "error", message: error.data.message });
    }
  };

  return (
    <div className="flex justify-center items-center mt-28 mb-28">
      <div className="text-center">
        <h1 className="text-3xl text-primary">Forget Your Password?</h1>
        <p className="text-xs mt-3 text-gray1">
          Enter email so that we can send you a reset code.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-9">
          <label htmlFor="email" className="text-start text-d2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="Your Email *"
            className={`${
              errors.email && "border-red-500"
            } border border-b1 outline-none rounded-md ps-3 py-2 text-sm mt-1`}
          />
          {errors.email && (
            <p className="text-red-600 text-xs text-start mt-1">
              {errors.email.message}
            </p>
          )}
          <button className="mt-4 bg-primary hover:bg-opacity-95 rounded-md py-2 text-white">
            {isLoading ? <Loader color="white" size="2xl" /> : "Send Email"}
          </button>
          <Link to="/login" className="mt-5 text-xs text-d2 hover:underline">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
