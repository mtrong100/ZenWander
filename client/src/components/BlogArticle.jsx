import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { ArrowRight } from "lucide-react";
import BlogBadge from "./BlogBadge";
import { format } from "timeago.js";
import Skeleton from "./Skeleton";
import { viewBlogApi } from "../api/blogApi";
import { toast } from "sonner";

const BlogArticle = ({ data }) => {
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
    <div className={"grid md:grid-cols-2 gap-5"}>
      <div onClick={handleViewBlog} className="aspect-video">
        <img
          src={data?.thumbnail}
          alt={data?.title}
          className="object-cover w-full h-full rounded"
        />
      </div>

      <div className="space-y-2">
        <div className="flex gap-2 items-center justify-between">
          <span className="text-sm text-gray-600">
            {format(data?.createdAt)}
          </span>
          <BlogBadge category={data?.category} />
        </div>

        <h1
          onClick={handleViewBlog}
          className="text-xl font-semibold line-clamp-2 hover:underline cursor-default"
        >
          {data?.title}
        </h1>

        <p className="flex-1 overflow-hidden text-gray-600 line-clamp-3 text-sm text-justify">
          {data?.description}
        </p>

        <Link to={`/blog/${data?._id}`} className="inline-block">
          <Button className="h-[42px] px-6">
            Read more <ArrowRight className="ml-1" size={20} />
          </Button>
        </Link>
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
