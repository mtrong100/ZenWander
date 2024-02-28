import React from "react";
import { Link } from "react-router-dom";
import BlogBadge from "./BlogBadge";
import { format } from "timeago.js";
import Skeleton from "./Skeleton";

const BlogCard = ({ data }) => {
  return (
    <article className="bg-white rounded-lg hover:shadow-md border">
      <Link to={`/blog/${data?._id}`}>
        <div className="aspect-video">
          <img
            src={data?.thumbnail}
            alt={data?.title}
            className="object-cover w-full h-full rounded"
          />
        </div>
      </Link>

      <div className="space-y-2 mt-1 py-2 px-3">
        <div className="flex gap-2 items-center justify-between">
          <span className="text-sm text-gray-600">
            {format(data?.createdAt)}
          </span>
          <BlogBadge category={data?.category} />
        </div>

        <Link
          to={`/blog/${data?._id}`}
          className="text-lg line-clamp-2 font-semibold hover:underline cursor-default"
        >
          {data?.title}
        </Link>

        <p className="line-clamp-3 text-gray-600 text-sm">
          {data?.description}
        </p>
      </div>
    </article>
  );
};

export default BlogCard;

export const BlogCardSkeleton = () => {
  return (
    <article className="bg-white rounded-lg hover:shadow-md border">
      <Skeleton className="aspect-video" />

      <div className="space-y-3 mt-1 py-2 px-3">
        <div className="space-y-2">
          <Skeleton className="h-[22px] w-full" />
          <Skeleton className="h-[22px] w-full" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-[12px] w-full" />
          <Skeleton className="h-[12px] w-full" />
          <Skeleton className="h-[12px] w-full" />
        </div>
      </div>
    </article>
  );
};
