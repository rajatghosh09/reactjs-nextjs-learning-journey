import { useNavigate } from "react-router-dom";
import useFormContext from "../Hooks/Context/UseFormContext";

const Review = () => {
  const { state, dispatch } = useFormContext();
  const navigate = useNavigate();

  const onSubmit = () => {
    console.log("Final Form Data:", state);

    alert("Form Submited")

    dispatch({
      type: "RESET_FORM",
    });
    navigate("/");
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-lg shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-800">
            Review Details
          </h1>
          <p className="text-sm text-gray-500">
            Please confirm your information before submitting
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">
            Personal Information
          </h2>

          <div className="rounded-xl border bg-white p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">First Name</span>
              <span className="font-medium text-gray-800">
                {state.personalInfo.firstName}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Last Name</span>
              <span className="font-medium text-gray-800">
                {state.personalInfo.lastName}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-gray-800">
                {state.personalInfo.email}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Phone Number</span>
              <span className="font-medium text-gray-800">
                {state.personalInfo.phoneNumber}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">
            Address Information
          </h2>

          <div className="rounded-xl border bg-white p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Address</span>
              <span className="font-medium text-gray-800">
                {state.addressInfo.address}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">City</span>
              <span className="font-medium text-gray-800">
                {state.addressInfo.city}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Pin Code</span>
              <span className="font-medium text-gray-800">
                {state.addressInfo.pinCode}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => navigate("/address")}
            className="w-1/2 rounded-xl border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Back
          </button>

          <button
            onClick={onSubmit}
            className="w-1/2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-2 text-white font-semibold shadow-md hover:from-green-700 hover:to-emerald-700 transition-all"
          >
            Submit 
          </button>
        </div>
      </div>
    </div>
  )
}

export default Review