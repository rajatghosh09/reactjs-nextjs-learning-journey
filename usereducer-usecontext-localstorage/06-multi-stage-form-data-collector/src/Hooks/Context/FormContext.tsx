import { useEffect, useReducer } from "react";
import formReducer, { initialFormState } from "../reducer/formReducer";
import FormContext from "./CreateFormContext";


const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem("multi-form-data");
    return stored ? JSON.parse(stored) : initialFormState;
  } catch {
    return initialFormState;
  }
};

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    formReducer,
    undefined,
    loadFromStorage
  );


  useEffect(() => {
    localStorage.setItem("multi-form-data", JSON.stringify(state));
  }, [state]);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;




// import { useReducer } from "react";
// import formReducer, { initialFormState } from "../reducer/formReducer";
// import FormContext from "./CreateFormContext";



// const FormProvider = ({ children }: { children: React.ReactNode }) => {
//   const [state, dispatch] = useReducer(formReducer, initialFormState);
//   return (
//     <FormContext.Provider value={{ state, dispatch }}>
      
//       {children}
//     </FormContext.Provider>
//   );
// };
// export default FormProvider;
