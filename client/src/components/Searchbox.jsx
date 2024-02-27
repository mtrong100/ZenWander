import { Search } from "lucide-react";
import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";

const Searchbox = ({
  queryValue,
  className,
  handleSearch = () => {},
  placeHolder = "What are you looking for?",
}) => {
  return (
    <div className="flex items-center  border border-gray-300 rounded-md h-[50px] px-3 w-full">
      <input
        type="text"
        value={queryValue}
        onChange={handleSearch}
        placeholder={placeHolder}
        className={twMerge(
          "w-full focus:outline-none max-w-full placeholder:text-base bg-transparent",
          className
        )}
      />
      <Search className="flex-shrink-0 ml-[15px]" />
    </div>
  );
};

export default Searchbox;
