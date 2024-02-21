import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { ArrowRight } from "lucide-react";
import BlogBadge from "./BlogBadge";

const BlogCard = () => {
  return (
    <div className={"grid md:grid-cols-2 gap-8"}>
      <Link to={`/`}>
        <div className="aspect-video">
          <img
            src={"https://source.unsplash.com/random"}
            alt={"This is a post title"}
            className="object-cover w-full h-full rounded"
          />
        </div>
      </Link>

      <div className=" space-y-2">
        <div className="flex gap-2 items-center justify-between">
          <span className="text-sm text-gray-600">
            {new Date(Date.now()).toDateString()}
          </span>
          <BlogBadge />
        </div>

        <h6 className="text-2xl font-semibold line-clamp-2 hover:underline cursor-default">
          {"This is a post title"}
        </h6>

        <p className="flex-1 overflow-hidden text-gray-600 line-clamp-4 text-sm text-justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi
          quam, pariatur, nobis iure sed cupiditate esse blanditiis impedit
          omnis cumque qui. Dolorem in mollitia sit nobis esse aliquid quae
          laborum.
        </p>

        <Button variant="secondary" className="h-[42px] px-6">
          Read more <ArrowRight className="ml-1" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;
