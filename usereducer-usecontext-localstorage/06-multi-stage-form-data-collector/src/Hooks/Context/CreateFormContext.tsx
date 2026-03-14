import { createContext } from "react";
import type { FormContextType } from "../../typescript";

const FormContext = createContext<FormContextType | undefined>(undefined);
export default FormContext
