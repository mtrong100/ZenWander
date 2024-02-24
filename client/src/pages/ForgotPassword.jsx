import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import FieldInput from "../components/FieldInput";
import { Mail, Lock } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  email: yup
    .string()
    .lowercase()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
    .required("OTP is required"),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      email: "",
      otp: "",
    },
  });

  const resetPassword = async (values) => {
    try {
      //...
      console.log(values);
    } catch (error) {
      toast.error("Failed to reset password");
      console.log("Failed to reset password ->", error);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-5 max-w-lg w-full">
      <h1 className="font-bold text-4xl text-center">
        Zen<span className="text-primary">Wander</span>
      </h1>
      <p className="text-center opacity-90 mt-2">Reset your password</p>

      <form onSubmit={handleSubmit(resetPassword)} className="mt-5">
        <div className="space-y-5 ">
          <FieldInput
            type="password"
            name="password"
            icon={<Lock color="#3b82f6" size={25} />}
            register={register}
            errorMessage={errors?.password?.message}
            placeholder="Enter your password..."
          />
          <FieldInput
            type="confirmPassword"
            name="confirmPassword"
            icon={<Lock color="#3b82f6" size={25} />}
            register={register}
            errorMessage={errors?.confirmPassword?.message}
            placeholder="Confirm your password..."
          />

          <div className="w-full">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <div className="absolute left-[15px] opacity-80 top-2/4 -translate-y-2/4">
                  <Mail color="#3b82f6" size={25} />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email..."
                  {...register("email")}
                  className={
                    "w-full p-3  border-gray-300 transition-all caret-primary border focus:border-primary outline-none rounded-lg shadow-sm pl-12"
                  }
                />
              </div>

              <Button type="button">Send OTP</Button>
            </div>

            {errors && (
              <p className="mt-1 font-medium text-rose-500">
                {errors?.email?.message}
              </p>
            )}
          </div>

          <FieldInput
            type="text"
            name="otp"
            icon={<Lock color="#3b82f6" size={25} />}
            register={register}
            errorMessage={errors?.otp?.message}
            placeholder="Enter your OTP..."
          />

          <div className="text-sm font-medium">
            <span className="opacity-70">Need </span>
            <Link className="hover:underline text-primary" to="/help">
              help?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full"
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
