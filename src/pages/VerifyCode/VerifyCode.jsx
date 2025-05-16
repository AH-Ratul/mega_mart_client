import React from "react";
import { useForm } from "react-hook-form";
import { useVerifyCodeMutation } from "../../redux/api/users_api";
import Loader from "../../components/Shared/Loader/Loader";
import CustomToast from "../../hooks/CustomToast";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await verifyCode(data).unwrap();

      CustomToast({ type: "success", message: result.message });
      reset();
      navigate("/resetPassword", { state: result.email });
    } catch (error) {
      error && CustomToast({ type: "error", message: error.data.message });
    }
  };

  return (
    <div className="flex justify-center items-center mt-28 mb-28">
      <div>
        <h1 className="text-3xl text-primary">Give Reset Code</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-9">
          <input
            type="text"
            id="code"
            {...register("code", {
              required: "Code is required",
            })}
            placeholder="Enter Reset Code *"
            className={`${
              errors.code && "border-red-500"
            } border border-b1 outline-none rounded-md ps-3 py-2 text-sm mt-1`}
          />
          {errors.code && (
            <p className="text-red-600 text-xs text-start mt-1">
              {errors.code.message}
            </p>
          )}

          <button className="mt-4 bg-primary hover:bg-opacity-95 rounded-md py-2 text-white">
            {isLoading ? <Loader color="white" size="2xl" /> : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCode;
