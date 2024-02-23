import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const bgStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(/bg2.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      className="flex items-center h-screen justify-center bg-gradient-to-r from-cyan-400 to-blue-400"
      // style={bgStyle}
    >
      <Outlet />
    </div>
  );
};

export default AuthLayout;
