import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getAllBlogsApi, viewBlogApi } from "../api/blogApi";
import { toast } from "sonner";
import { format } from "timeago.js";

const Banner = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchHotBlogs();
  }, []);

  async function fetchHotBlogs() {
    try {
      const data = await getAllBlogsApi({
        limit: 3,
        status: "Hot",
      });
      setBlogs(data?.docs);
    } catch (error) {
      toast.error("Failed to fetch blogs");
      console.log("Failed to fetch blogs ->", error);
      setBlogs([]);
    }
  }

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 1,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 1,
        },
      }}
    >
      {blogs?.map((item) => (
        <BlogItem key={item?._id} item={item} />
      ))}
    </Carousel>
  );
};

export default Banner;

function BlogItem({ item }) {
  const navigate = useNavigate();

  const handleViewBlog = async () => {
    try {
      await viewBlogApi(item?._id);
      navigate(`/blog/${item?._id}`);
    } catch (error) {
      toast.error("Failed to update view count");
      console.log("Failed to update view count ->", error);
    }
  };

  return (
    <div className="w-full my-6">
      <div className="relative w-full h-[500px] 2xl:h-[600px] flex  ">
        <div onClick={handleViewBlog} className="w-full ">
          <img
            src={item?.thumbnail}
            alt={item?.title}
            className="w-full md:w-3/4 h-64 md:h-[420px] 2xl:h-[560px] rounded object-cover"
          />
        </div>

        <div className="absolute flex flex-col md:right-10 bottom-10 md:bottom-2 w-full md:w-2/4 lg:w-1/3 2xl:w-[480px]  shadow-2xl p-5 bg-white rounded-lg gap-3">
          <h1
            onClick={handleViewBlog}
            className="font-semibold text-2xl line-clamp-2 hover:underline"
          >
            {item?.title}
          </h1>

          <div className="flex-1 overflow-hidden line-clamp-4 text-gray-700 text-sm text-justify">
            {item?.description}
          </div>
          <Link to={`/blog/${item?._id}`} className="inline-block">
            <Button>Continue reading</Button>
          </Link>
          <Link to={`/`} className="flex gap-3 items-center">
            <img
              src={item?.author?.avatar}
              alt={item?.author?.name}
              className="object-cover w-10 h-10 rounded-full"
            />
            <span className="font-medium text-gray-700 dark:text-slate-500">
              {item?.author?.name}
            </span>
            <span className="text-gray-500 dark:text-gray-600">
              {format(item?.createdAt)}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
