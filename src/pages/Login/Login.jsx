import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { allIcons } from "../../data/all-icons";
import { useLoginMutation } from "../../redux/api/users_api";
import { useDispatch } from "react-redux";
import { login, setLoading } from "../../redux/slices/authSlice";

const Login = () => {
  const { google, phone } = allIcons;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loginUser, { isSuccess, isLoading, isError, error }] =
    useLoginMutation();

  const dispatch = useDispatch();

  // HANDLE LOGIN FUNCTIONALTIY
  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    try {
      const result = await loginUser(data).unwrap();

      console.log(result);

      const user = {
        name: result.data.user.name,
        email: result.data.user.email,
        phone: result.data.user.phone,
      };
      //console.log(user);
      dispatch(login({ user: user, token: result.token }));

      // clear fields
      reset();

      navigate("/");
      dispatch(setLoading(false));
    } catch (error) {
      console.log("Err ->", error);
      dispatch(setLoading(false));
    }

    // if (isLoading) {
    //   return <Modal modal={<Loader />} />;
    // }
  };
  return (
    <div className="flex justify-center items-center md:mt-6">
      <div className="w-full px-4 md:px-20  lg:w-[500px] lg:px-12 py-4 rounded-lg lg:shadow-a2">
        {isError && <p>{error.data.message}</p>}
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
            className={`${
              errors.email && "border-red-500"
            } border border-primary outline-none rounded-md ps-3 py-2 mt-5`}
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
            <Link className="text-sm mt-1 w-fit text-d2 hover:text-red-500">
              Forgot Password?
            </Link>
          </div>
          <button className="mt-3 bg-secondary hover:opacity-90 py-3 rounded-md text-white text-base font-medium tracking-wider text-center">
            {isLoading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
        {/* social login */}
        <div className="flex justify-center items-center gap-5 mt-5">
          <button className="flex justify-center items-center  rounded-md gap-2 py-2 text-xl w-full border border-secondary ">
            <span>{google}</span>
            <span className="text-primary text-base">Google</span>
          </button>
          <Link className="flex justify-center items-center rounded-md gap-2 py-2 text-xl w-full border border-secondary ">
            <span>{phone}</span>
            <span className="text-primary text-base">Phone</span>
          </Link>
        </div>
        {/* register link */}
        <p className="text-sm text-center my-8">
          New Member?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary tracking-wider"
          >
            Register
          </Link>{" "}
          Here
        </p>
      </div>
    </div>
  );
};

export default Login;
