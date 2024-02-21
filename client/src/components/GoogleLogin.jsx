import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = ({ onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center p-3 gap-2
   justify-center border cursor-pointer  hover:bg-gray-100 transition-all border-gray-300 rounded-full "
    >
      <span className="flex-shrink-0">
        <FcGoogle size={22} />
      </span>
      <div className="font-medium text-center transition-all ">
        Continue with Google
      </div>
    </div>
  );
};

export default GoogleLogin;
