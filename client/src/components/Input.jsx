import React from "react";
import { twMerge } from "tailwind-merge";

const Input = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={twMerge(
        "w-full p-3  border-gray-300 transition-all caret-primary border focus:border-primary outline-none rounded-lg",
        className
      )}
    />
  );
};

export default Input;
