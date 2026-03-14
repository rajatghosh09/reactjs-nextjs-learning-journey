import { RouterProvider } from "react-router-dom";
import Router from "./Routes/Router";
import CartProvider from "./hooks/ContextProvider";
import { Toaster } from "sonner";


function App() {
  return (
    <>
      <CartProvider>
        <Toaster richColors position="top-right" closeButton />
        <RouterProvider router={Router} />
      </CartProvider>
    </>
  );
}

export default App;
