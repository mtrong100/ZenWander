import { twMerge } from "tailwind-merge";

const FieldInput = ({
  name,
  register,
  icon,
  errorMessage,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute left-[15px] opacity-80 top-2/4 -translate-y-2/4">
          {icon}
        </div>
        <input
          {...register(name)}
          {...props}
          className={twMerge(
            "w-full p-3  border-gray-300 transition-all caret-primary border focus:border-primary outline-none rounded-lg shadow-sm pl-12",
            className
          )}
        />
      </div>
      {errorMessage && (
        <p className="mt-1 font-medium text-rose-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default FieldInput;
