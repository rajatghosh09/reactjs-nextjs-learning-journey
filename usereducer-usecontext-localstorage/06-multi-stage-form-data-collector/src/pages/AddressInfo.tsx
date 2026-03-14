import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import  useFormContext  from "../Hooks/Context/UseFormContext";
import type { FormData } from "../typescript";

type AddressInfoForm = FormData["addressInfo"];

const AddressInfo = () => {
  const { state, dispatch } = useFormContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressInfoForm>({
    defaultValues: state.addressInfo,
  });

  const onSubmit = (data: AddressInfoForm) => {
    dispatch({
      type: "UPDATE_ADDRESS_INFO",
      payload: data,
    });

    navigate("/review");
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-lg shadow-2xl p-8 space-y-6"
      >
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-800">
            Address Information
          </h1>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Address
          </label>
          <input
            {...register("address", { required: "Address is required" })}
            className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 ${
              errors.address
                ? "border-red-400 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="123, Main Street"
          />
          {errors.address && (
            <p className="text-xs text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            City
          </label>
          <input
            {...register("city", { required: "City is required" })}
            className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 ${
              errors.city
                ? "border-red-400 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Kolkata"
          />
          {errors.city && (
            <p className="text-xs text-red-500">
              {errors.city.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">
            Pin Code
          </label>
          <input
            type="text"
            {...register("pinCode", {
              required: "Pin code is required",
              minLength: {
                value: 6,
                message: "Pin code must be 6 digits",
              },
              maxLength: {
                value: 6,
                message: "Pin code must be 6 digits",
              },
            })}
            className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 ${
              errors.pinCode
                ? "border-red-400 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="700001"
          />
          {errors.pinCode && (
            <p className="text-xs text-red-500">
              {errors.pinCode.message}
            </p>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-1/2 rounded-xl border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Back
          </button>

          <button
            type="submit"
            className="w-1/2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2 text-white font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressInfo;
