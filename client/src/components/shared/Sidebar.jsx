import React from "react";
import Separator from "../Separator";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../utils/constants";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sticky top-0 left-0 w-[280px] h-screen bg-slate-50 p-4 border-r">
      <Link to="/" className="font-bold text-3xl">
        <h1 className="font-bold text-3xl text-center">
          Zen<span className="text-primary">Wander</span>
        </h1>
      </Link>
      <Separator className="my-3" />
      <ul className="flex flex-col gap-1">
        {sidebarLinks.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              to={item.path}
              key={item.title}
              className={`${
                isActive
                  ? "opacity-100 font-semibold text-primary bg-gray-100 "
                  : "hover:bg-gray-100 "
              } h-[50px] text-lg px-5 rounded-md cursor-pointer flex items-center gap-3`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
