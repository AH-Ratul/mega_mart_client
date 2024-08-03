import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    //clear fields
    reset();
  };
  return (
    <div className="flex justify-center items-center mt-6">
      <div className="w-full px-5 md:px-20 lg:w-[500px] lg:px-16 py-4 rounded-lg lg:shadow-a2">
        <h1 className="font-bold text-2xl text-center text-primary mt-9">
          Register Here
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            {...register("name")}
            className=" border border-primary outline-none rounded-md ps-3 py-2 mt-5"
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
            className=" border border-primary outline-none rounded-md ps-3 py-2 mt-5"
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
            className=" border border-primary outline-none rounded-md ps-3 py-2 mt-5"
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
            className=" border border-primary outline-none rounded-md ps-3 py-2 mt-5"
          />
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
          <input
            type="password"
            id="confirmpassword"
            placeholder="Confirm Your Password"
            {...register("confirmpassword", {
              required: "You have to confirm your password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className=" border border-primary outline-none rounded-md ps-3 py-2 mt-5"
          />
          {errors.confirmpassword && (
            <p className="text-red-600 text-xs mt-1">
              {errors.confirmpassword.message}
            </p>
          )}
          <button className="mt-5 mb-8 bg-secondary hover:opacity-90 py-3 rounded-md text-white text-base font-medium tracking-wider">
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
