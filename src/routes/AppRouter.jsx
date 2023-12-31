import { createBrowserRouter } from "react-router-dom";
import Root from "../components/layouts/Root";
import Home from "../components/pages/home/Home";
import Login from "../components/pages/auth/Login";
import PrivetRoute from "./PrivetRoute";
import Services from "../components/pages/services/Services";
import Blog from "../components/pages/blogs/Blog";
import Contact from "../components/pages/contact/Contact";
import DetailsServiceCard from "../components/pages/services/DetailsServiceCard";
import Register from "../components/pages/auth/Register";
import ErrorPage from "../components/pages/error/ErrorPage";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("/news.json"),
      },
      {
        path: "/services",
        element: <Services></Services>,
        loader: () => fetch("/services.json"),
      },
      {
        path: "/services/:id",
        element: (
          <PrivetRoute>
            <DetailsServiceCard></DetailsServiceCard>
          </PrivetRoute>
        ),
        loader: () => fetch("/services.json"),
      },
      {
        path: "/blogs",
        element: (
          <PrivetRoute>
            <Blog></Blog>
          </PrivetRoute>
        ),
        loader: () => fetch("/news.json"),
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default AppRouter;
