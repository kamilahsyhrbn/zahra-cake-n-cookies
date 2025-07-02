import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { routes } from "./config/routes.jsx";
import { Toaster } from "react-hot-toast";

const ScrollToTop = () => {
  useEffect(() => {
    const unlisten = routes.subscribe(() => {
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
    });
    return () => unlisten();
  }, []);
  return null;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <ScrollToTop />
    <RouterProvider router={routes} />
  </StrictMode>
);
