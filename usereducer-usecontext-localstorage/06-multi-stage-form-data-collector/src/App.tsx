import "./App.css";
import { RouterProvider } from "react-router-dom";
import Router from "./Routes/Router";
import FormProvider from "./Hooks/Context/FormContext";

function App() {
  return (
    <>
      <FormProvider>
        <RouterProvider router={Router} />
      </FormProvider>
    </>
  );
}

export default App;
