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

import ProtectedRoute from "../utils/protectedRoute";

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
        element: (
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/admins",
        element: (
          <ProtectedRoute role="admin">
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/admin-form/:id?",
        element: (
          <ProtectedRoute role="admin">
            <AdminForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/menus",
        element: (
          <ProtectedRoute role="admin">
            <Menu />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/menu-form/:id?",
        element: (
          <ProtectedRoute role="admin">
            <MenuForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/categories",
        element: (
          <ProtectedRoute role="admin">
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/category-form/:id?",
        element: (
          <ProtectedRoute role="admin">
            <CategoryForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <ProtectedRoute role="admin">
            <Order />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/order-detail/:id",
        element: (
          <ProtectedRoute role="admin">
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <ProtectedRoute role="admin">
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/report",
        element: (
          <ProtectedRoute role="admin">
            <Report />
          </ProtectedRoute>
        ),
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
