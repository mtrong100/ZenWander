import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUp, Mail, SendHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

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
  return (
    <div>
      <div className="relative">
        <div className="absolute left-[15px] opacity-80 top-2/4 -translate-y-2/4">
          <Mail color="#3b82f6" size={25} />
        </div>
        <input
          type="email"
          placeholder="Enter your email"
          className={
            "w-full p-3  border-gray-300 transition-all caret-primary border focus:border-primary outline-none rounded-lg shadow-sm pl-12"
          }
        />
      </div>
      <Button className="mt-3 h-[45px] ml-auto">
        Send <SendHorizontal className="ml-1" size={16} />
      </Button>
    </div>
  );
}

function SendOtp() {
  return (
    <div>
      <div className="relative">
        <div className="absolute left-[15px] opacity-80 top-2/4 -translate-y-2/4">
          <Mail color="#3b82f6" size={25} />
        </div>
        <input
          type="email"
          placeholder="Enter your email"
          className={
            "w-full p-3  border-gray-300 transition-all caret-primary border focus:border-primary outline-none rounded-lg shadow-sm pl-12"
          }
        />
      </div>
      <Button className="mt-3 h-[45px] ml-auto">
        Send <SendHorizontal className="ml-1" size={16} />
      </Button>
    </div>
  );
}
