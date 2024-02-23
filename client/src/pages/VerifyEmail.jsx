import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmailApi } from "../api/authApi";
import { toast } from "sonner";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const token = searchParams.get("token");

  useEffect(() => {
    fetchVerifyEmailApi();
  }, [token]);

  async function fetchVerifyEmailApi() {
    try {
      const res = await verifyEmailApi(token);
      console.log(res);
      setIsVerified(res?.verified);
      toast.success(res?.message);
    } catch (error) {
      console.log("Failed to fetch verification token ->", error);
      toast.error("Failed to fetch verification token");
      setIsVerified(false);
    }
  }

  return (
    <section className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">
          This email is{" "}
          <span className="text-green-600">
            {isVerified ? "verified" : "Not verified"}
          </span>
        </h1>
        {isVerified ? (
          <p className="opacity-90">
            You are all set, your account was already verified.
          </p>
        ) : (
          <p className="opacity-90">
            Failed to verify your email, Please try again
          </p>
        )}
        <Button onClick={() => navigate("/login")} className="w-full">
          Continue to ZenWander
        </Button>
      </div>
    </section>
  );
};

export default VerifyEmail;
