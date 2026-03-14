import type { FormAction, FormData } from "../../typescript";

export const initialFormState: FormData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  },
  addressInfo: {
    address: "",
    city: "",
    pinCode: "",
  },
};

const formReducer = (state: FormData, action: FormAction) => {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          ...action.payload,
        },
      };

    case "UPDATE_ADDRESS_INFO":
      return {
        ...state,
        addressInfo: {
          ...state.addressInfo,
          ...action.payload,
        },
      };

    case "RESET_FORM":
      return initialFormState;

    default:
      return state;
  }
};

export default formReducer;
