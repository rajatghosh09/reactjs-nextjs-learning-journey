import { createBrowserRouter, Outlet } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import MenuLists from "../pages/MenuLists";
import Carts from "../pages/Carts";


const router = createBrowserRouter([
     {
    element: (
      <>
        <HeaderNav />
        <Outlet />
      </>
    ),
    children: [
      { path: "/", element: <MenuLists /> },
      { path: "/cart", element: <Carts /> },
    ],
  },
]);

export default router;
