import { Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import UserBlog from "../components/UserBlog";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Button from "../components/Button";
import useOnchange from "../hooks/useOnchange";
import useUploadImage from "../hooks/useUploadImage";
import { updateUserApi } from "../api/userApi";
import { storeCurrentUser } from "../redux/slices/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

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

        <div className="absolute bottom-5 right-5">
          <ProfileModal />
        </div>
      </div>

      <UserBlog />
    </section>
  );
};

export default Profile;

const ProfileModal = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { value, setValue, handleChange } = useOnchange();
  const {
    image,
    setImage,
    selectFile,
    isLoading: isUploading,
  } = useUploadImage();

  useEffect(() => {
    if (currentUser) {
      setValue(currentUser?.name);
      setImage(currentUser?.avatar);
    }
  }, [currentUser, setImage, setValue]);

  const updateUserProfile = async () => {
    if (!value.trim() || !image) return;

    try {
      setIsLoading(true);
      const token = JSON.parse(localStorage.getItem("ZENWANDER_TOKEN") || "");
      const request = {
        avatar: image,
        name: value,
      };

      const res = await updateUserApi(currentUser?._id, request, token);
      dispatch(storeCurrentUser(res?.results));
      toast.success(res?.message);
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed tp update profile");
      console.log("Failed to update profile ->", error);
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div>
        <Pencil
          onClick={() => setIsOpen(true)}
          size={25}
          className="cursor-pointer hover:opacity-80 text-gray-500 hover:text-primary"
        />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[99999]"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-gray-900"
                  >
                    Your profile
                  </Dialog.Title>

                  <div className="mt-5 flex flex-col justify-center items-center gap-5">
                    <div className="space-y-2 text-center">
                      <div className="w-[150px] h-[150px]">
                        <img
                          src={image}
                          alt="avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="dropzone-file"
                          className="text-primary font-medium hover:underline"
                        >
                          {isUploading ? "Uploading..." : "Change avatar"}
                        </label>
                        <input
                          onChange={selectFile}
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                        />
                      </div>
                    </div>

                    <input
                      type="text"
                      value={value}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full p-3  border-gray-300 transition-all caret-primary border focus:border-primary outline-none rounded-lg shadow-sm"
                    />
                  </div>

                  <Button onClick={updateUserProfile} className="mt-5 ml-auto">
                    {isLoading ? "Updating..." : "Update profile"}
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
