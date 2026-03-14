import { createBrowserRouter } from "react-router-dom"
import HomePage from "../components/HomePage";
import QuizPage from "../pages/QuizPage";

const appRouter  = createBrowserRouter([
    {
        path: "/",
        element:<HomePage/>
    },
    {
        path: "/quiz",
        element:<QuizPage/>
    }
]);
export default appRouter ;