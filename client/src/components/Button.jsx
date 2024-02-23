import React from "react";
import { twMerge } from "tailwind-merge";

const variantClasses = {
  primary: "bg-primary hover:bg-primary/90 text-white",
  secondary:
    "border border-primary hover:bg-primary text-primary hover:text-white",
};

const Button = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        "px-5 w-fit font-medium flex items-center justify-center transition-all cursor-pointer h-[48px] rounded-lg",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;

export const ButtonIcon = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={twMerge(
        "flex items-center border border-gray-300 hover:bg-gray-100 justify-center w-[48px] transition-all cursor-pointer h-[48px] rounded-lg",
        className
      )}
    >
      {children}
    </button>
  );
};
