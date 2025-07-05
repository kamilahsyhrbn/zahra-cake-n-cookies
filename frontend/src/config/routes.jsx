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
import { Report } from "../pages/admin/report/Report";

import LoginUser from "../pages/user/auth/Login";

import ProtectedRoute from "../utils/protectedRoute";
import PublicOnlyRoute from "../utils/publicOnlyRoute";
import { Register } from "../pages/user/auth/Register";
import { ForgotPassword } from "../pages/user/auth/ForgotPassword";
import { ResetPassword } from "../pages/user/auth/ResetPassword";
import { Contact } from "../pages/user/main/Contact";
import MenuUser from "../pages/user/main/menu/Menu";
import { SearchResult } from "../pages/user/main/SearchResult";
import { DetailMenu } from "../pages/user/main/menu/DetailMenu";
import { Cart } from "../pages/user/main/Cart";
import { Checkout } from "../pages/user/main/buy/Checkout";
import { Payment } from "../pages/user/main/buy/Payment";
import { PaymentStatus } from "../pages/user/main/buy/PaymentStatus";
import { MyProfile } from "../pages/user/main/profile/MyProfile";
import { UpdateProfile } from "../pages/user/main/profile/UpdateProfile";
import { ChangePassword } from "../pages/user/main/profile/ChangePassword";
import { OrderHistory } from "../pages/user/main/order/OrderHistory";
import { OrderHistoryDetail } from "../pages/user/main/order/OrderHistoryDetail";
import { Error } from "../pages/Error";

export const routes = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  // Admin
  {
    path: "/admin/login",
    element: (
      <PublicOnlyRoute>
        <Login />
      </PublicOnlyRoute>
    ),
  },
  {
    element: <AdminLayout />,
    errorElement: <Error />,
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
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/menus",
        element: <MenuUser />,
      },
      {
        path: "/detail-menu/:id",
        element: <DetailMenu />,
      },
      {
        path: "/search-result",
        element: <SearchResult />,
      },
      {
        path: "/login",
        element: (
          <PublicOnlyRoute>
            <LoginUser />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <PublicOnlyRoute>
            <ForgotPassword />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "/reset-password/:token",
        element: (
          <PublicOnlyRoute>
            <ResetPassword />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute role="user">
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute role="user">
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment/:id",
        element: (
          <ProtectedRoute role="user">
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/my-profile",
        element: (
          <ProtectedRoute role="user">
            <MyProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/update-profile",
        element: (
          <ProtectedRoute role="user">
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile/change-password",
        element: (
          <ProtectedRoute role="user">
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order-history",
        element: (
          <ProtectedRoute role="user">
            <OrderHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order-history/:id",
        element: (
          <ProtectedRoute role="user">
            <OrderHistoryDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/payment-status",
    errorElement: <Error />,
    element: (
      <ProtectedRoute role="user">
        <PaymentStatus />
      </ProtectedRoute>
    ),
  },
]);
