import React from "react";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "../../redux/api/users_api";
import CustomToast from "../../hooks/CustomToast";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [postData, { isSuccess, isLoading, isError, error }] =
    useCreateUserMutation();

  const onSubmit = async (data) => {
    try {
      const post = await postData(data).unwrap();

      CustomToast({ type: "success", message: post.message });
      //clear fields
      reset();
    } catch (error) {
      console.log("Err ->", error.data);
      CustomToast({ type: "error", message: error.data.message });
    }
  };
  return (
    <div className="flex justify-center items-center mt-6 mb-9">
      <div className="w-full px-5 md:px-20 lg:w-[430px] lg:px-8 py-4 rounded-lg lg:border lg:border-b1">
        <h1 className="font-medium text-2xl text-center text-primary mt-9 lg:mt-3">
          Create Account
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            {...register("name")}
            className=" border border-b1 text-sm outline-none rounded-md ps-3 py-2 mt-5"
          />
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            className=" border border-b1 text-sm outline-none rounded-md ps-3 py-2 mt-5"
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
          )}
          <input
            type="number"
            id="phone"
            placeholder="Your Phone"
            {...register("phone", {
              required: "Phone is required",
              minLength: {
                value: 11,
                message: "Enter a valid phone number",
              },
            })}
            className=" border border-b1 text-sm outline-none rounded-md ps-3 py-2 mt-5"
          />
          {errors.phone && (
            <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
          )}
          <input
            type="password"
            id="password"
            placeholder="Your Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className=" border border-b1 text-sm outline-none rounded-md ps-3 py-2 mt-5"
          />
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
          <input
            type="password"
            id="passwordConfirm"
            placeholder="Confirm Your Password"
            {...register("passwordConfirm", {
              required: "You have to confirm your password",
              message: "Password must be at least 6 characters",
            })}
            className=" border border-b1 text-sm outline-none rounded-md ps-3 py-2 mt-5"
          />
          {errors.confirmpassword && (
            <p className="text-red-600 text-xs mt-1">
              {errors.confirmpassword.message}
            </p>
          )}
          <button className="mt-5 bg-primary hover:bg-opacity-90 py-[6px] rounded-md text-white text-base font-medium tracking-wide text-center">
            {isLoading ? "Creating.." : "Create"}
          </button>
        </form>
        <div>
          <p className="text-xs mt-6 font-medium tracking-wide">
            By Creating account, you agree to our{" "}
            <Link className="text-sky-800 hover:text-primary underline">
              Conditions of Use
            </Link>{" "}
            and{" "}
            <Link className="text-sky-800 hover:text-primary underline">
              Privacy Notice
            </Link>
            .
          </p>
        </div>
        {/* LOGIN LINK */}
        <p className="text-xs text-center mt-8 mb-4">
          Already Have an Account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary tracking-wider"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
