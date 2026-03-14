import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/NotFound";
import Wrapper from "../components/Wrapper";
import { Suspense } from "react";
import Products from "../pages/Product";
import Author from "../pages/Author";
import AuthorDetails from "../pages/AuthorDetails";
import ViewProduct from "../pages/ViewProduct";
import Loader from "../components/Loader";
import WeatherApp from "../pages/WeatherApp";
import Home from "../components/Home";
import JokeGen from "../pages/JokeGen";


const Route = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "product",
        element: (
          <Suspense fallback={<Loader />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "product/viewproduct/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <ViewProduct />
          </Suspense>
        ),
      },
      {
        path: "author",
        element: (
          <Suspense fallback={<Loader />}>
            <Author />
          </Suspense>
        ),
      },
      {
        path: "author/authordetails/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <AuthorDetails />
          </Suspense>
        ),
      },
      {
        path: "weatherapp",
        element: (
          <Suspense fallback={<Loader />}>
            <WeatherApp />
          </Suspense>
        ),
      },
      {
        path: "joke",
        element: (
          <Suspense fallback={<Loader />}>
            <JokeGen/>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default Route;
