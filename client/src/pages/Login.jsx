import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "../components/FieldInput";
import { Mail, Lock } from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .lowercase()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const loginUser = async (values) => {
    try {
      //...
    } catch (error) {
      console.log("Failed to register an account ->", error);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-5 max-w-lg w-full">
      <h1 className="font-bold text-4xl text-center">
        Zen<span className="text-primary">Wander</span>
      </h1>

      <form onSubmit={handleSubmit(loginUser)} className="mt-6">
        <h1 className="font-medium text-2xl mb-4">Sign in to your account</h1>
        <div className="space-y-5">
          <FieldInput
            type="email"
            name="email"
            icon={<Mail color="#3b82f6" size={25} />}
            register={register}
            errorMessage={errors?.email?.message}
            placeholder="Enter your email..."
          />
          <FieldInput
            type="password"
            name="password"
            icon={<Lock color="#3b82f6" size={25} />}
            register={register}
            errorMessage={errors?.password?.message}
            placeholder="Enter your password..."
          />

          <div className="text-sm font-medium">
            <span className="opacity-70">Not have an account? </span>
            <Link className="hover:underline text-primary" to="/register">
              Register
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
