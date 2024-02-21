import React from "react";
import Banner from "../components/Banner";
import { blogCategories } from "../utils/constants";
import { displayCategoryBadge } from "../utils/helper";
import BlogCard from "../components/BlogCard";
import TrendingBlogCard from "../components/TrendingBlogCard";

const Home = () => {
  return (
    <>
      <Banner />
      <section className="my-12">
        {/* Categories */}
        <div>
          <h1 className="font-semibold text-2xl mb-5">Popular Categories</h1>
          <ul className="flex items-center gap-4 flex-wrap">
            {blogCategories.map((item) => (
              <li
                key={item.title}
                className={`${displayCategoryBadge(
                  item.title
                )} uppercase bg-primary rounded text-white font-semibold px-5 py-2 cursor-default flex items-center gap-2 hover:opacity-90`}
              >
                {item.icon}
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-[minmax(0,_1fr)_300px] gap-8 mt-8">
          <ul className="flex flex-col gap-5">
            {Array(6)
              .fill(0)
              .map((item, index) => (
                <BlogCard key={index} />
              ))}
          </ul>
          <div>
            <h1 className="font-semibold text-2xl mb-5">Trending Blogs</h1>
            <ul className="flex flex-col gap-5">
              {Array(4)
                .fill(0)
                .map((item, index) => (
                  <TrendingBlogCard key={index} />
                ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
