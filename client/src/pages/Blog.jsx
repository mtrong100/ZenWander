import React from "react";
import Searchbox from "../components/Searchbox";
import BlogCard from "../components/BlogCard";
import TrendingBlogCard from "../components/TrendingBlogCard";

const Blog = () => {
  return (
    <section className="my-10">
      <h1 className="text-6xl text-center font-bold mb-20">
        <span className="text-primary">Finding</span> your best blogs
      </h1>

      <div>
        <div className="flex items-center gap-3">
          <Searchbox />
        </div>

        <ul className="grid grid-cols-4 gap-3 mt-6">
          {Array(20)
            .fill(0)
            .map((item, index) => (
              <TrendingBlogCard key={index} />
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Blog;
