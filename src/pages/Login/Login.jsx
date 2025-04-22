import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { allIcons } from "../../data/all-icons";
import { useLoginMutation } from "../../redux/api/users_api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import CustomToast from "../../hooks/CustomToast";
import Loader from "../../components/Shared/Loader/Loader";

const Login = () => {
  const { google, phone } = allIcons;
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loginUser, { isLoading }] = useLoginMutation();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // HANDLE LOGIN FUNCTIONALTIY
  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data).unwrap();
      CustomToast({ type: "success", message: result.message });

      dispatch(setUser(result.data.user));

      reset();

      const to = location?.state?.from?.pathname || "/";
      navigate(to);
    } catch (error) {
      console.log(error);
      CustomToast({ type: "error", message: error.data.message });
    }
  };

  return (
    <div className="flex justify-center items-center pt-28">
      <div className="w-full px-4 md:px-20  lg:w-[400px] lg:px-8 py-4 rounded-lg lg:border lg:border-b1">
        <h1 className="font-medium text-2xl text-center text-primary mt-9 lg:mt-3">
          Login
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
            className={`${
              errors.email && "border-red-500"
            } border border-b1 outline-none rounded-md ps-3 py-2 text-sm mt-5`}
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
            className=" border border-b1 outline-none rounded-md ps-3 py-2 text-sm mt-3"
          />
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
          <div className="flex justify-end">
            <Link
              to="/forgetpassword"
              className="text-xs mt-2 w-fit text-d2 hover:text-red-500"
            >
              Forgot Password?
            </Link>
          </div>
          <button className="mt-3 bg-primary hover:bg-opacity-90 py-[7px] rounded-md text-white text-base font-medium tracking-wide text-center">
            {isLoading || loading ? (
              <Loader color="white" size="24px" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div>
          <p className="text-xs mt-6 font-medium tracking-wide">
            By Continuing, you agree to our{" "}
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
        {/* social login */}
        <div className="flex justify-center items-center gap-5 mt-5">
          <button className="flex justify-center items-center  rounded-md gap-2 py-1 text-base w-full border border-secondary ">
            <span>{google}</span>
            <span className="text-primary text-sm">Google</span>
          </button>
          <Link className="flex justify-center items-center rounded-md gap-2 py-1 text-base w-full border border-secondary ">
            <span>{phone}</span>
            <span className="text-primary text-sm">Phone</span>
          </Link>
        </div>
        {/* register link */}
        <p className="text-xs text-center mt-8 mb-4">
          New Here?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary tracking-wider"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
