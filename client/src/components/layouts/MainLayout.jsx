import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="w-full max-w-[1170px] px-5 mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
