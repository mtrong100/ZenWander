import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button, { ButtonIcon } from "./Button";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";

const Banner = () => {
  const [savedBlog, setSavedBlog] = useState(false);

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
      infinite
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
      {Array(3)
        .fill(0)
        .map((item, index) => (
          <div key={index} className="w-full my-6">
            <div className="relative w-full h-[500px] 2xl:h-[600px] flex  ">
              <Link to={`/`} className="w-full ">
                <img
                  src={"https://source.unsplash.com/random"}
                  alt="Banner"
                  className="w-full md:w-3/4 h-64 md:h-[420px] 2xl:h-[560px] rounded object-cover"
                />
              </Link>

              <div className="absolute flex flex-col md:right-10 bottom-10 md:bottom-2 w-full md:w-2/4 lg:w-1/3 2xl:w-[480px]  shadow-2xl p-5 bg-white rounded-lg gap-3">
                <Link to={`/`}>
                  <h1 className="font-semibold text-2xl line-clamp-2">
                    Top scorer to the final match
                  </h1>
                </Link>

                <div className="flex-1 overflow-hidden line-clamp-4 text-gray-700 text-sm text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga
                  tempora eum repellendus veritatis officia quam illo quaerat
                  magnam cum itaque quas sed perspiciatis a, obcaecati voluptas
                  tenetur alias minus odio!
                </div>
                <div className="flex items-center gap-3">
                  <Button>Continue reading</Button>
                  <ButtonIcon onClick={() => setSavedBlog(!savedBlog)}>
                    {savedBlog ? (
                      <IoBookmark size={28} color="#eab308" />
                    ) : (
                      <IoBookmarkOutline size={28} color="#eab308" />
                    )}
                  </ButtonIcon>
                </div>
                <Link to={`/`} className="flex gap-3 items-center">
                  <img
                    src={"https://source.unsplash.com/random"}
                    alt="User profile"
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  <span className="font-medium text-gray-700 dark:text-slate-500">
                    {"Crowbar"}
                  </span>
                  <span className="text-gray-500 dark:text-gray-600">
                    {/* {new Date(post?.createdAt).toDateString()} */}
                    {new Date(Date.now()).toDateString()}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </Carousel>
  );
};

export default Banner;
