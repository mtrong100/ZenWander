import React from "react";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);

  return (
    <section className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">
          This email is <span className="text-green-600">verified</span>
        </h1>
        <p className="opacity-90">
          You are all set, nmtrong90@gmail.com was already verified.
        </p>
        <Button onClick={() => navigate("/login")} className="w-full">
          Continue to ZenWander
        </Button>
      </div>
    </section>
  );
};

export default VerifyEmail;
