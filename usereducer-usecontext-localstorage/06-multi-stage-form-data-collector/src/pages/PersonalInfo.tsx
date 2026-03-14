import { useNavigate } from "react-router-dom";
import useFormContext from "../Hooks/Context/UseFormContext";
import { useForm } from "react-hook-form";
import type { FormData } from "../typescript";

type PersonalInfoForm = FormData["personalInfo"];


const PersonalInfo = () => {
  const { state, dispatch } = useFormContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoForm>({
    defaultValues: state.personalInfo,
  });

  const onSubmit = (data: PersonalInfoForm) => {
    dispatch({
      type: "UPDATE_PERSONAL_INFO",
      payload: data,
    });

    navigate("/address");
  };


  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-lg shadow-2xl p-8 space-y-6"
        >
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-gray-800">
              Personal Information
            </h1>
          </div>

          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              First Name
            </label>
            <input
              {...register("firstName", { required: "First name is required" })}
              className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 ${errors.firstName
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
              placeholder="Rajat"
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Last Name
            </label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 ${errors.lastName
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
              placeholder="Ghosh"
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>

          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 ${errors.email
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
              placeholder="rajat@gmail.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              {...register("phoneNumber", {
                required: "Phone number is required",
                minLength: {
                  value: 10,
                  message: "Must be at least 10 digits",
                },
              })}
              className={`w-full rounded-lg border px-4 py-2 transition focus:outline-none focus:ring-2 ${errors.phoneNumber
                  ? "border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
              placeholder="9876543210"
            />
            {errors.phoneNumber && (
              <p className="text-xs text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>


          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 text-white font-semibold shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Next
          </button>
        </form>
      </div>

    </>
  )
}

export default PersonalInfo