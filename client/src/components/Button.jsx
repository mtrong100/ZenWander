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
        "px-5 w-fit font-medium text-lg transition-all cursor-pointer h-[48px] rounded-lg",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
