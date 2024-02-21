import React from "react";
import { twMerge } from "tailwind-merge";

const Textarea = ({ className = "", ...props }) => {
  return (
    <textarea
      {...props}
      className={twMerge(
        "w-full resize-none min-h-[207px] p-3  border-gray-300 transition-all caret-primary border focus:border-primary outline-none rounded-lg",
        className
      )}
    />
  );
};

export default Textarea;
