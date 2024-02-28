import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { ArrowRight } from "lucide-react";
import BlogBadge from "./BlogBadge";
import { format } from "timeago.js";
import Skeleton from "./Skeleton";

const BlogArticle = ({ data }) => {
  return (
    <div className={"grid md:grid-cols-2 gap-5"}>
      <Link to={`/`}>
        <div className="aspect-video">
          <img
            src={data?.thumbnail}
            alt={data?.title}
            className="object-cover w-full h-full rounded"
          />
        </div>
      </Link>

      <div className="space-y-2">
        <div className="flex gap-2 items-center justify-between">
          <span className="text-sm text-gray-600">
            {format(data?.createdAt)}
          </span>
          <BlogBadge category={data?.category} />
        </div>

        <h6 className="text-xl font-semibold line-clamp-2 hover:underline cursor-default">
          {data?.title}
        </h6>

        <p className="flex-1 overflow-hidden text-gray-600 line-clamp-3 text-sm text-justify">
          {data?.description}
        </p>

        <Button className="h-[42px] px-6">
          Read more <ArrowRight className="ml-1" size={20} />
        </Button>
      </div>
    </div>
  );
};

export default BlogArticle;

export const BlogArticleSkeleton = () => {
  return (
    <div className={"grid md:grid-cols-2 gap-5"}>
      <Skeleton className="aspect-video" />

      <div className="space-y-5">
        <div className="space-y-2">
          <Skeleton className="h-[22px] w-full" />
          <Skeleton className="h-[22px] w-full" />
          <Skeleton className="h-[22px] w-full" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-[12px] w-full" />
          <Skeleton className="h-[12px] w-full" />
          <Skeleton className="h-[12px] w-full" />
          <Skeleton className="h-[12px] w-full" />
          <Skeleton className="h-[12px] w-full" />
          <Skeleton className="h-[12px] w-full" />
        </div>
      </div>
    </div>
  );
};
