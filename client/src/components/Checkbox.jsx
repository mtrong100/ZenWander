import { IoIosCheckmark } from "react-icons/io";
import { twMerge } from "tailwind-merge";

const Checkbox = ({ type = "uncheck", className = "" }) => {
  return (
    <div
      className={twMerge(
        `${
          type === "checked" ? "bg-primary text-white" : ""
        } rounded-lg w-[30px] border-2  h-[30px] cursor-default`,
        className
      )}
    >
      {type === "checked" && <IoIosCheckmark size={25} />}
    </div>
  );
};

export default Checkbox;
