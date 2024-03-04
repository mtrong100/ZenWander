import { Pencil } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import UserBlog from "../components/UserBlog";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const updateUserProfile = async () => {
    try {
      //....
    } catch (error) {
      toast.error("Failed tp update profile");
      console.log("Failed to update profile ->", error);
    }
  };

  return (
    <section className="py-10">
      {/* Profile banner */}
      <div className="bg-gradient-to-r relative from-slate-100 to-slate-200 py-5 px-10 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="w-[200px] h-[200px] border-4 flex-shrink-0 rounded-full">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="object-cover rounded-full w-full h-full"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center items-center gap-5">
            <h1 className="text-5xl font-bold">{currentUser?.name}</h1>

            <div className="flex items-center gap-5">
              <span>12 Followers</span>
              <span>10 Following</span>
            </div>
          </div>
        </div>

        <div onClick={updateUserProfile} className="absolute bottom-5 right-5">
          <Pencil
            size={25}
            className="cursor-pointer hover:opacity-80 text-gray-500 hover:text-primary"
          />
        </div>
      </div>

      <UserBlog />
    </section>
  );
};

export default Profile;
