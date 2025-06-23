import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="">
      <hr className="my-6 border-gray-200 sm:mx-auto" />
      <span className="block text-sm text-gray-500 text-center">
        © 2025{" "}
        <Link to="/admin/dashboard" className="hover:underline">
          Zahra Cake & Cookies
        </Link>
        .
      </span>
    </div>
  );
};
