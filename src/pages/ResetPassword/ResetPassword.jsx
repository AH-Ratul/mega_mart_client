import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/api/users_api";
import Loader from "../../components/Shared/Loader/Loader";
import CustomToast from "../../hooks/CustomToast";

const ResetPassword = () => {
  const location = useLocation();
  const email = location?.state;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const onSubmit = async (data) => {
    try {
      const newData = {
        email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      };

      const result = await resetPassword(newData).unwrap();
      console.log(result);

      CustomToast({ type: "success", message: result.message });
      reset();
    } catch (error) {
      error && CustomToast({ type: "error", message: error.data.message });
    }
  };

  return (
    <div className="flex justify-center items-center mt-28 mb-28">
      <div className="text-center">
        <h1 className="text-3xl text-primary">Reset Your Password</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-9">
          <input
            type="password"
            id="password"
            placeholder="Give New Password"
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
            placeholder="Confirm New Password"
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

          <button className="mt-4 bg-primary hover:bg-opacity-95 rounded-md py-2 text-white">
            {isLoading ? (
              <Loader color="white" size="2xl" />
            ) : (
              "Reset Your Password"
            )}
          </button>

          {isSuccess && (
            <Link to="/login" className="mt-5 text-xs text-d2 hover:underline">
              Go to Login
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
