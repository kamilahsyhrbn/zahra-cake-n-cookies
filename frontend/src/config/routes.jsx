import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { Home } from "../pages/user/main/Home";
import { UserLayout } from "../components/layout/UserLayout";
import { AdminLayout } from "../components/layout/AdminLayout";
import { Login } from "../pages/admin/Login";
import { Dashboard } from "../pages/admin/Dashboard";
import { Admin } from "../pages/admin/admin/Admin";
import { AdminForm } from "../pages/admin/admin/AdminForm";
import { Menu } from "../pages/admin/menu/Menu";
import { MenuForm } from "../pages/admin/menu/MenuForm";
import { Category } from "../pages/admin/category/Category";
import { CategoryForm } from "../pages/admin/category/CategoryForm";
import { Order } from "../pages/admin/order/Order";
import { OrderDetails } from "../pages/admin/order/OrderDetails";
import { Users } from "../pages/admin/Users";
import { Download } from "../pages/admin/report/Download";
import { Report } from "../pages/admin/report/Report";

export const routes = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/download",
    element: <Download />,
  },
  // Admin
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/admins",
        element: <Admin />,
      },
      {
        path: "/admin/admin-form/:id?",
        element: <AdminForm />,
      },
      {
        path: "/admin/menus",
        element: <Menu />,
      },
      {
        path: "/admin/menu-form/:id?",
        element: <MenuForm />,
      },
      {
        path: "/admin/categories",
        element: <Category />,
      },
      {
        path: "/admin/category-form/:id?",
        element: <CategoryForm />,
      },
      {
        path: "/admin/orders",
        element: <Order />,
      },
      {
        path: "/admin/order-detail/:id",
        element: <OrderDetails />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/report",
        element: <Report />,
      },
    ],
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
