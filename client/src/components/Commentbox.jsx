import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useSelector } from "react-redux";
import Button from "./Button";

const Commentbox = ({
  value,
  onChange = () => {},
  onClick = () => {},
  loading,
}) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <div className="flex items-start gap-3">
        <img
          src={currentUser?.avatar}
          alt={currentUser?.name}
          className="w-[50px] h-[50px] object-cover rounded-full flex-shrink-0"
        />
        <TextareaAutosize
          placeholder="Write your thoughts...."
          value={value}
          onChange={onChange}
          className="w-full p-3 resize-none min-h-[150px]  border-gray-300 transition-all caret-primary border focus:border-primary outline-none rounded-lg shadow-sm"
        />
      </div>

      <Button disabled={loading} onClick={onClick} className="ml-auto mt-3">
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
};

export default Commentbox;
