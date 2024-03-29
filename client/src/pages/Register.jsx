import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "../components/FieldInput";
import { Mail, User, Lock } from "lucide-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
import { defaultAvatar } from "../utils/constants";
import { googleLoginApi, registerApi } from "../api/authApi";
import { toast } from "sonner";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { storeCurrentUser } from "../redux/slices/userSlice";

const schema = yup.object().shape({
  name: yup.string().trim().required("Username is required"),
  email: yup
    .string()
    .lowercase()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      password: "",
      email: "",
    },
  });

  const registerUser = async (values) => {
    try {
      const request = {
        ...values,
        provider: "email/password",
        avatar: defaultAvatar,
      };

      const res = await registerApi(request);

      if (res?.verificationToken) {
        toast.info(
          "Create user sucessfully. Please verify your email to login"
        );
      }

      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log("Failed to register an account ->", error);
      toast.error("Failed to register an account");
    }
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const results = await signInWithPopup(auth, provider);
      const user = results.user;

      const request = {
        name: user?.displayName,
        email: user?.email,
        avatar: user?.photoURL,
        provider: "google",
      };

      const res = await googleLoginApi(request);
      toast.success(res?.message);
      localStorage.setItem("ZENWANDER_TOKEN", JSON.stringify(res?.token));
      dispatch(storeCurrentUser(res?.results));
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Failed to login with google ->", error);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-5 max-w-lg w-full">
      <h1 className="font-bold text-4xl text-center">
        Zen<span className="text-primary">Wander</span>
      </h1>

      <form onSubmit={handleSubmit(registerUser)} className="mt-6">
        <GoogleLogin onClick={googleLogin} />

        <div className="flex items-center my-3">
          <div className="h-[1px] w-full bg-gray-300"></div>
          <span className="px-3">Or</span>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>

        <div className="space-y-5 ">
          <FieldInput
            type="text"
            name="name"
            icon={<User color="#3b82f6" size={25} />}
            register={register}
            errorMessage={errors?.name?.message}
            placeholder="Enter your name..."
          />
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

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              <span className="opacity-70">Already have an account? </span>
              <Link className="hover:underline text-primary" to="/login">
                Login
              </Link>
            </div>

            <div className="text-sm font-medium">
              <span className="opacity-70">Need </span>
              <Link className="hover:underline text-primary" to="/help">
                help?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full"
          >
            {isSubmitting ? "Loading..." : "Create an account"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
