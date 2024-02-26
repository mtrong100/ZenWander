import React from "react";
import { twMerge } from "tailwind-merge";

const Textarea = ({
  className = "",
  name,
  register,
  errorMessage,
  ...props
}) => {
  return (
    <div className="w-full">
      <textarea
        {...props}
        {...register(name)}
        className={twMerge(
          "w-full resize-none min-h-[207px] p-3  border-gray-300 transition-all caret-primary border focus:border-primary outline-none rounded-lg",
          className
        )}
      />

      {errorMessage && (
        <p className="mt-1 font-medium text-rose-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Textarea;
