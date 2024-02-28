import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogBadge from "../components/BlogBadge";
import { format } from "timeago.js";
import useGetBlogDetail from "../hooks/useGetBlogDetail";
import { Eye } from "lucide-react";
import parse from "html-react-parser";

const BlogDetail = () => {
  const { id } = useParams();
  const { blog, isLoading } = useGetBlogDetail(id);

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (isLoading)
    return (
      <div className="w-full h-full my-28 flex items-center justify-center">
        <span className="text-6xl text-slate-500 font-bold animate-bounce">
          Loading...
        </span>
      </div>
    );

  return (
    <section className="my-10">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <div className="space-y-3">
            <BlogBadge category={blog?.category} />
            <h1 className="text-3xl font-bold leading-snug">{blog?.title}</h1>
            <p>{blog?.description}</p>
            <div className="flex items-center gap-5">
              <span className="text-sm text-gray-600">
                {format(blog?.createdAt)}
              </span>
              <div className="text-primary flex items-center font-semibold gap-2">
                60 <Eye size={20} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <img
              src={blog?.author?.avatar}
              alt={blog?.author?.name}
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            <h1 className="font-semibold text-lg">{blog?.author?.name}</h1>
          </div>
        </div>

        <div className="h-[400px]">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 mx-auto w-full max-w-5xl">
        {parse(blog?.content || "")}
      </div>
    </section>
  );
};

export default BlogDetail;
