import { createBrowserRouter, Navigate } from "react-router-dom";
import Wrapper from "../layout/Wrapper";
import Dashboard from "../pages/admin/Dashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import AuthRoute from "../layout/AuthRoute";
import ProtectedRoute from "../layout/ProtectedRoute";
import AddStudentDetails from "../pages/admin/AddStudentDetails";
import ViewStudents from "../pages/admin/ViewStudents";
import { Suspense } from "react";
import Loader from "../components/Loader";

const Route = createBrowserRouter([
    {
        element: <AuthRoute />,
        children: [
            {
                path: "/signin",
                element: (
                    <Suspense fallback={<Loader />}>
                        <SignIn />
                    </Suspense>
                )
            },
            {
                path: "/signup",
                element: (
                    <Suspense fallback={<Loader />}>
                        <SignUp />
                    </Suspense>)
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/admin",
                element: <Wrapper />,
                children: [
                    {
                        path: "dashboard",
                        element: (
                            <Suspense fallback={<Loader />}>
                                <Dashboard />
                            </Suspense>)
                    },
                    {
                        path: "add-student-details",
                        element: (
                            <Suspense fallback={<Loader />}>
                                <AddStudentDetails />
                            </Suspense>)
                    },
                    {
                        path: "edit-student-details/:id",
                        element: (
                            <Suspense fallback={<Loader />}>
                                <AddStudentDetails />
                            </Suspense>)
                    },
                    {
                        path: "view-students",
                        element: (
                            <Suspense fallback={<Loader />}>
                                <ViewStudents />
                            </Suspense>)
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/signin" />,
    },
]);


export default Route;