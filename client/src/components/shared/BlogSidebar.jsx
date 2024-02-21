import React from "react";
import TrendingBlogCard from "../TrendingBlogCard";

const BlogSidebar = () => {
  return (
    <div className="space-y-6">
      {/* Trending Blogs */}
      <div>
        <h1 className="font-semibold text-2xl mb-3">Trending Blogs</h1>
        <ul className="flex flex-col gap-5">
          {Array(3)
            .fill(0)
            .map((item, index) => (
              <TrendingBlogCard key={index} />
            ))}
        </ul>
      </div>

      {/* Popular Writters */}
      <div>
        <h1 className="font-semibold text-2xl mb-3">Popular Writters</h1>
        <ul className="flex flex-col gap-5">
          {Array(6)
            .fill(0)
            .map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] flex-shrink-0h">
                  <img
                    src="https://source.unsplash.com/random"
                    alt="user"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className="flex-1">
                  <h1 className="font-semibold">Cecor</h1>
                  <p className="opacity-80">2 Followers</p>
                </div>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;
