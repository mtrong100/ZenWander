import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../../../../server/utils/constants";
import Button from "../Button";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="p-5  max-w-[1920px] mx-auto">
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

          <Button onClick={() => navigate("/login")} className="px-6">
            Login
          </Button>
        </ul>
      </div>
    </header>
  );
};

export default Header;
