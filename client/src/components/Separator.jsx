import React from "react";
import { twMerge } from "tailwind-merge";

const Separator = ({ className = "" }) => {
  return (
    <div
      className={twMerge("bg-gray-300 h-[1px] w-full my-4", className)}
    ></div>
  );
};

export default Separator;
