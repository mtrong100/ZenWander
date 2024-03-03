import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogBadge from "./BlogBadge";
import { format } from "timeago.js";
import Skeleton from "./Skeleton";
import { toast } from "sonner";
import { viewBlogApi } from "../api/blogApi";

const BlogCard = ({ data }) => {
  const navigate = useNavigate();

  const handleViewBlog = async () => {
    try {
      await viewBlogApi(data?._id);
      navigate(`/blog/${data?._id}`);
    } catch (error) {
      toast.error("Failed to update view count");
      console.log("Failed to update view count ->", error);
    }
  };

  return (
    <article className="bg-white rounded-lg hover:shadow-md border">
      <div onClick={handleViewBlog} className="aspect-video">
        <img
          src={data?.thumbnail}
          alt={data?.title}
          className="object-cover w-full h-full rounded"
        />
      </div>

      <div className="space-y-2 mt-1 py-2 px-3">
        <div className="flex gap-2 items-center justify-between">
          <span className="text-sm text-gray-600">
            {format(data?.createdAt)}
          </span>
          <BlogBadge category={data?.category} />
        </div>

        <h1
          onClick={handleViewBlog}
          className="text-lg line-clamp-2 font-semibold hover:underline cursor-default"
        >
          {data?.title}
        </h1>

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
