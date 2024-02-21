import React from "react";
import Banner from "../components/Banner";
import BlogSidebar from "../components/shared/BlogSidebar";
import CategoryTab from "../components/CategoryTab";
import BlogCard from "../components/BlogCard";

const Home = () => {
  return (
    <>
      <Banner />
      <section className="my-12">
        <CategoryTab />
        <div className="grid grid-cols-[minmax(0,_1fr)_300px] gap-8 mt-8">
          {/* Lastest blogs */}
          <ul className="flex flex-col gap-5">
            {Array(6)
              .fill(0)
              .map((item, index) => (
                <BlogCard key={index} />
              ))}
          </ul>

          <BlogSidebar />
        </div>
      </section>
    </>
  );
};

export default Home;
