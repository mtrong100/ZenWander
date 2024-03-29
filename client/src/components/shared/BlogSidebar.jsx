import React, { useEffect, useState } from "react";
import BlogCard, { BlogCardSkeleton } from "../BlogCard";
import { getAllBlogsApi } from "../../api/blogApi";
import { toast } from "sonner";
import { getPopularWrittersApi } from "../../api/userApi";

const BlogSidebar = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchBlogs();
    fetchUsers();
  }, []);

  async function fetchBlogs() {
    try {
      setIsLoading(true);
      const data = await getAllBlogsApi({ limit: 3, status: "Trending" });
      setBlogs(data?.docs);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch lastest blogs");
      console.log("Failed to fetch lastest blogs ->", error);
      setIsLoading(false);
      setBlogs([]);
    }
  }

  async function fetchUsers() {
    try {
      const res = await getPopularWrittersApi();
      setUsers(res);
    } catch (error) {
      console.log("Failed to fetch popular writters ->", error);
      setUsers([]);
    }
  }

  return (
    <div className="space-y-6">
      {/* Trending Blogs */}
      <div>
        <h1 className="font-semibold text-2xl mb-3">Trending Blogs</h1>
        <ul className="flex flex-col gap-5">
          {isLoading &&
            Array(3)
              .fill(0)
              .map((item, index) => <BlogCardSkeleton key={index} />)}

          {!isLoading &&
            blogs?.map((item) => <BlogCard key={item?._id} data={item} />)}
        </ul>
      </div>

      {/* Popular Writters */}
      <div>
        <h1 className="font-semibold text-2xl mb-3">Popular Writters</h1>
        <ul className="flex flex-col gap-5">
          {users?.map((item) => (
            <div key={item?._id} className="flex items-center gap-2">
              <div className="w-[40px] h-[40px] flex-shrink-0h">
                <img
                  src={item?.avatar}
                  alt={item?.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="flex-1">
                <h1 className="font-semibold">{item?.name}</h1>
                <p className="opacity-80">
                  {item?.followers?.length || 0} Followers
                </p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;
