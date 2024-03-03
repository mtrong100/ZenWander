import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogBadge from "../components/BlogBadge";
import { format } from "timeago.js";
import useGetBlogDetail from "../hooks/useGetBlogDetail";
import { Eye } from "lucide-react";
import parse from "html-react-parser";
import useGetBlogByCategory from "../hooks/useGetBlogByCategory";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BlogCard from "../components/BlogCard";
import TitleSection from "../components/TitleSection";
import { useSelector } from "react-redux";
import Commentbox from "../components/Commentbox";
import Button from "../components/Button";
import Comment, { CommentSkeleton } from "../components/Comment";
import useOnchange from "../hooks/useOnchange";
import { toast } from "sonner";
import {
  createCommentApi,
  deleteCommentApi,
  getAllComments,
  updateCommentApi,
} from "../api/commentApi";
import { commentParams } from "../utils/constants";

const BlogDetail = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const { blog, isLoading } = useGetBlogDetail(id);
  const { blogs: relatedBlogs } = useGetBlogByCategory(blog?.category);
  const { value, handleChange, setValue } = useOnchange();

  const [comments, setComments] = useState([]);
  const [totalCmts, setTotalCmts] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);
  const [cmtId, setCmtId] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [limit, setLimit] = useState(commentParams.LIMIT);

  // useEffect(() => {
  //   document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  // }, []);

  useEffect(() => {
    fetchComments();
  }, [limit]);

  async function fetchComments() {
    try {
      setLoadingComments(true);
      const data = await getAllComments({ limit: limit });
      setTotalCmts(data?.totalDocs);
      setComments(data?.docs);
      setLoadingComments(false);
    } catch (error) {
      toast.error("Failed to fetch comments");
      console.log("Failed to fetch comments ->", error);
      setComments([]);
      setLoadingComments(false);
      setTotalCmts(null);
    }
  }

  const loadMoreComments = () => {
    setLimit((prev) => prev + 10);
  };

  const addNewComment = async () => {
    try {
      setIsAdding(true);
      const token = JSON.parse(localStorage.getItem("ZENWANDER_TOKEN") || "");

      const request = {
        content: value.trim(),
        user: currentUser?._id,
        blog: id,
      };

      let res;
      if (cmtId) {
        res = await updateCommentApi(token, cmtId, request);
      } else {
        res = await createCommentApi(token, request);
      }

      toast.success(res?.message);
      fetchComments();

      setCmtId("");
      setValue("");
      setIsAdding(false);
    } catch (error) {
      toast.error("Failed to add new comment");
      console.log("Failed to add new comment ->", error);
      setIsAdding(false);
      setValue("");
      setCmtId("");
    }
  };

  const deleteComment = async (cmtId) => {
    try {
      const token = JSON.parse(localStorage.getItem("ZENWANDER_TOKEN") || "");
      const res = await deleteCommentApi(cmtId, token);
      toast.success(res?.message);
      fetchComments();
    } catch (error) {
      toast.error(`Failed to delete comment with ID: ${cmtId}`);
      console.log(`Failed to delete comment with ID: ${cmtId} ->`, error);
    }
  };

  const updateComment = (data) => {
    setCmtId(data?._id);
    setValue(data?.content);
  };

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
      {/* Banner */}
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

      {/* Comments */}
      <div className="mt-10">
        <Commentbox
          value={value}
          onChange={handleChange}
          onClick={addNewComment}
          loading={isAdding}
        />

        <h1 className="text-2xl font-semibold">Comments ({totalCmts})</h1>

        <div className="my-5 space-y-5 w-full max-w-5xl mx-auto">
          {loadingComments &&
            Array(10)
              .fill(0)
              .map((item, index) => <CommentSkeleton key={index} />)}

          {!loadingComments &&
            comments?.map((item) => (
              <Comment
                onUpdate={updateComment}
                onDelete={deleteComment}
                key={item?._id}
                data={item}
              />
            ))}
        </div>

        {comments?.length >= 10 && (
          <Button onClick={loadMoreComments} className="mx-auto px-10">
            Load more
          </Button>
        )}
      </div>

      {/* Related blogs */}
      <div className="my-10">
        <TitleSection>Suggested for you</TitleSection>

        <div className="mt-6">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-with-dots"
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
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 3,
                partialVisibilityGutter: 40,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
                partialVisibilityGutter: 30,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 2,
                partialVisibilityGutter: 30,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {relatedBlogs?.map((item) => (
              <BlogCard key={item?._id} data={item} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
