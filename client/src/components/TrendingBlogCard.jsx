import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { ArrowRight } from "lucide-react";
import BlogBadge from "./BlogBadge";

const TrendingBlogCard = () => {
  return (
    <article>
      <Link to={`/`}>
        <div className="aspect-video">
          <img
            src={"https://source.unsplash.com/random"}
            alt={"This is a post title"}
            className="object-cover w-full h-full rounded"
          />
        </div>
      </Link>

      <div className="space-y-1 mt-3">
        <div className="flex gap-2 items-center justify-between">
          <span className="text-sm text-gray-600">
            {new Date(Date.now()).toDateString()}
          </span>
          <BlogBadge />
        </div>

        <h6 className="text-xl line-clamp-2 font-semibold">
          {"This is a post title"}
        </h6>

        <p className="flex-1 overflow-hidden line-clamp-3 text-gray-600 text-sm text-justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi
          quam, pariatur, nobis iure sed cupiditate esse blanditiis impedit
          omnis cumque qui. Dolorem in mollitia sit nobis esse aliquid quae
          laborum.
        </p>
      </div>
    </article>
  );
};

export default TrendingBlogCard;
