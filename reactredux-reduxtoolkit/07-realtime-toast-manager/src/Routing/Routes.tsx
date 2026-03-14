import { createBrowserRouter } from "react-router-dom";
import Notifications from "../Pages/Notifications";


const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Notifications />,
  },
]);

export default Routes;
