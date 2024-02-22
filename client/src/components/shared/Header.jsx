import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../Button";
import { navLinks } from "../../utils/constants";
import { Popover, Transition } from "@headlessui/react";
import { LayoutDashboard, LogOut, User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {};

  return (
    <header className="p-5  max-w-[1920px] mx-auto sticky top-0 bg-white z-[9999] shadow-sm border-b border-gray-200">
      <div className="w-full max-w-[1190px] mx-auto flex items-center justify-between">
        <Link to="/" className="font-bold text-3xl">
          <h1 className="font-bold text-4xl text-center">
            Zen<span className="text-primary">Wander</span>
          </h1>
        </Link>

        <ul className="flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = item.path === location.pathname;

            return (
              <Link
                to={item.path}
                key={item.title}
                className={`${
                  isActive
                    ? "font-medium border-b border-black"
                    : "font-normal hover:border-b hover:border-black"
                }  cursor-pointer text-lg`}
              >
                {item.title}
              </Link>
            );
          })}

          {/* <Button onClick={() => navigate("/login")} className="px-6">
            Login
          </Button> */}

          <Popover className="relative">
            {() => (
              <>
                <Popover.Button className="w-[40px] h-[40px] rounded-full">
                  <img
                    src="https://source.unsplash.com/random"
                    alt="user-avatar"
                    className="object-cover rounded-full w-full h-full"
                  />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute right-0 z-50 mt-3 bg-white w-[200px] rounded-lg shadow-md p-1 border border-gray-300">
                    <ul className="flex flex-col">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 h-[45px] hover:bg-gray-200 pl-3 rounded-md"
                      >
                        <LayoutDashboard size={20} />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 h-[45px] hover:bg-gray-200 pl-3 rounded-md"
                      >
                        <User size={20} />
                        Profile
                      </Link>
                      <li
                        onClick={handleLogout}
                        className="flex items-center gap-3 h-[45px] cursor-pointer hover:bg-gray-200 pl-3 rounded-md"
                      >
                        <LogOut size={20} />
                        Logout
                      </li>
                    </ul>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </ul>
      </div>
    </header>
  );
};

export default Header;
