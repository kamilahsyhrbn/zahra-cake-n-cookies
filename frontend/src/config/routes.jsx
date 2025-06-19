import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { Home } from "../pages/user/main/Home";
import { UserLayout } from "../components/layout/UserLayout";
import { Login } from "../pages/admin/Login";

export const routes = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  // Admin
  {
    path: "/admin/login",
    element: <Login />,
  },

  // User
  {
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
