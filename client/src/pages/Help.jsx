import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUp, Mail, SendHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import useOnchange from "../hooks/useOnchange";
import { toast } from "sonner";
import { resendOtplApi, resendVerifyEmailApi } from "../api/authApi";

const Help = () => {
  return (
    <section className="bg-white shadow-xl rounded-xl p-5 max-w-lg w-full">
      <h1 className="font-bold text-4xl text-center">
        Zen<span className="text-primary">Wander</span>
      </h1>

      <p className="text-center mt-2">
        Help center with authentication problems
      </p>

      <div className="space-y-2 w-full mt-5">
        <div>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex  w-full justify-between rounded-lg bg-blue-100 p-4 text-left font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                  <span>Can not receive verify email?</span>
                  <ChevronUp
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-blue-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="p-4 text-gray-600 bg-slate-100">
                  <SendVerifyEmail />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <div>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex  w-full justify-between rounded-lg bg-blue-100 p-4 text-left font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                  <span>Password changes?</span>
                  <ChevronUp
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-blue-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="p-4 text-gray-600 bg-slate-100">
                  Go to this link{" "}
                  <Link
                    to="/forgot-password"
                    className="text-primary hover:underline font-medium"
                  >
                    here
                  </Link>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <div>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex  w-full justify-between rounded-lg bg-blue-100 p-4 text-left font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                  <span>OTP expired, send new one?</span>
                  <ChevronUp
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-blue-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="p-4 text-gray-600 bg-slate-100">
                  <SendOtp />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </section>
  );
};

export default Help;

function SendVerifyEmail() {
  const [isSending, setIsSending] = useState(false);
  const { value, handleChange, setValue } = useOnchange();

  const handleSendVerifyEmail = async () => {
    try {
      setIsSending(true);
      const res = await resendVerifyEmailApi({ email: value });
      toast.success(res?.message);
      setIsSending(false);
      setValue("");
    } catch (error) {
      toast.error("Failed so send verify email");
      console.log("Failed so send verify email ->", error);
      setIsSending(false);
      setValue("");
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute left-[15px] opacity-80 top-2/4 -translate-y-2/4">
          <Mail color="#3b82f6" size={25} />
        </div>
        <input
          type="email"
          value={value}
          placeholder="Enter your email"
          onChange={handleChange}
          className={
            "w-full p-3  border-gray-300 transition-all caret-primary border focus:border-primary outline-none rounded-lg shadow-sm pl-12"
          }
        />
      </div>
      <Button onClick={handleSendVerifyEmail} className="mt-3 h-[45px] ml-auto">
        {isSending ? (
          "Sending..."
        ) : (
          <>
            Send <SendHorizontal className="ml-1" size={16} />
          </>
        )}
      </Button>
    </div>
  );
}

function SendOtp() {
  const [isSending, setIsSending] = useState(false);
  const { value, handleChange, setValue } = useOnchange();

  const handleSendOtp = async () => {
    try {
      setIsSending(true);
      const res = await resendOtplApi({ email: value });
      toast.success(res?.message);
      setIsSending(false);
      setValue("");
    } catch (error) {
      toast.error("Failed so send OTP");
      console.log("Failed so send OTP ->", error);
      setIsSending(false);
      setValue("");
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute left-[15px] opacity-80 top-2/4 -translate-y-2/4">
          <Mail color="#3b82f6" size={25} />
        </div>
        <input
          type="email"
          value={value}
          placeholder="Enter your email"
          onChange={handleChange}
          className={
            "w-full p-3  border-gray-300 transition-all caret-primary border focus:border-primary outline-none rounded-lg shadow-sm pl-12"
          }
        />
      </div>
      <Button onClick={handleSendOtp} className="mt-3 h-[45px] ml-auto">
        {isSending ? (
          "Sending..."
        ) : (
          <>
            Send <SendHorizontal className="ml-1" size={16} />
          </>
        )}
      </Button>
    </div>
  );
}
