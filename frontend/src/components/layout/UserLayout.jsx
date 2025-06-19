import React from "react";
import { Navbar } from "../pages/user/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "../pages/user/Footer";
import ScrollToTop from "react-scroll-to-top";

export const UserLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-svh">
        <Outlet />
      </div>
      <ScrollToTop
        smooth
        height="1.5rem"
        width="2.5rem"
        color="#ffffff"
        style={{
          borderRadius: "50%",
          backgroundColor: "#54b0a2",
        }}
      />
      <Footer />
    </>
  );
};
