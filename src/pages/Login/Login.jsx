import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    // clear fields
    reset();
  };
  return (
    <div className="flex justify-center items-center mt-6">
      <div className="w-[500px] px-16 py-4 rounded-lg shadow-a2">
        <h1 className="font-bold text-2xl text-center text-primary mt-9">
          Login Here
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
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
            className=" border border-primary outline-none rounded-md ps-3 py-2 mt-5"
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
          )}
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Your Password *"
            className=" border border-primary outline-none rounded-md ps-3 py-2 mt-3"
          />
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
          <div className="flex justify-end">
            <Link className="text-sm mt-1 w-fit text-d2 hover:text-red-500">Forget Password?</Link>
          </div>
          <button className="mt-3 bg-secondary hover:opacity-90 py-3 rounded-md text-white font-bold text-base">
            Login
          </button>
          
          <p className=" text-center my-8 font-semibold">New Member? <Link className=" text-primary">Register</Link> Here</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
