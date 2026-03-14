import { RouterProvider } from "react-router-dom";
import ReduxProvider from "./Hooks/utils/ReduxProvider";
import appRouter from "./Routes/Routes";

function App() {
  return (
    <ReduxProvider>
      <RouterProvider router={appRouter} />
    </ReduxProvider>
  );
}

export default App;
