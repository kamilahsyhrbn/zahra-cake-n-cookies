import { Outlet } from "react-router-dom";
import { Sidebar } from "../pages/admin/Sidebar";
import { Footer } from "../pages/admin/Footer";

export const AdminLayout = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex flex-col md:w-full p-5 justify-between overflow-x-auto">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
