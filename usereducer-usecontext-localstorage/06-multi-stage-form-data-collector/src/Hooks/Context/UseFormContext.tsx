import { useContext } from "react";
import FormContext from "./CreateFormContext";

const useFormContext = () => {
    const context = useContext(FormContext);

    if (context === undefined) {
        throw new Error("useFormContext must be within a formprovider")
    }

    return context
}

export default useFormContext