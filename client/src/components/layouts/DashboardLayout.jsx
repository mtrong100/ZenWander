import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";

const DashboardLayout = () => {
  return (
    <section className="relative flex items-start ">
      <Sidebar />
      <main className="p-5 w-full">
        <Outlet />
      </main>
    </section>
  );
};

export default DashboardLayout;
