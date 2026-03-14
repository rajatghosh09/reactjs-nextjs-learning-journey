import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import NotFoundPage from "../pages/NotFoundPage";
import PersonalInfo from "../pages/PersonalInfo";
import AddressInfo from "../pages/AddressInfo";
import Review from "../pages/Review";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children:[
            {
                path: "/",
                element: <PersonalInfo/>
            },
            {
                path: "/address",
                element: <AddressInfo />
            },
            {
                path: "/review",
                element: <Review />
            }
        ]
    }
])

export default Router