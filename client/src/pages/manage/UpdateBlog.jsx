import React, { useEffect, useRef, useState } from "react";
import TitleSection from "../../components/TitleSection";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FieldInput from "../../components/FieldInput";
import { Pen, X } from "lucide-react";
import UploadThumbnail from "../../components/UploadThumbnail";
import Textarea from "../../components/Textarea";
import ListboxRoot from "../../components/ListboxRoot";
import { blogCategories, blogStatus } from "../../utils/constants";
import Button from "../../components/Button";
import JoditEditor from "jodit-react";
import { toast } from "sonner";
import useUploadImage from "../../hooks/useUploadImage";
import slugify from "slugify";
import { useDispatch, useSelector } from "react-redux";
import { updateBlogApi } from "../../api/blogApi";
import { useParams } from "react-router-dom";
import useGetBlogDetail from "../../hooks/useGetBlogDetail";

const schema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(10, "Title is too short")
    .max(100, "Title is too long")
    .required("Title is required"),
  description: yup
    .string()
    .trim()
    .min(50, "Description is too short")
    .required("Description is required"),
});

const UpdateBlog = () => {
  const { id } = useParams();
  const { blog } = useGetBlogDetail(id);
  const { currentUser } = useSelector((state) => state.user);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const { image, setImage, selectFile, isLoading } = useUploadImage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onchange",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (blog) {
      const { thumbnail, category, status, title, description, content } = blog;
      setImage(thumbnail);
      setSelectedCategory(category);
      setSelectedStatus(status);
      setContent(blog?.content);
      reset({
        title,
        description,
      });
    }
  }, [blog, reset, setImage, setSelectedCategory, setSelectedStatus]);

  const updateBlog = async (values) => {
    if (!(image || selectedCategory || content.trim())) {
      toast.info("Please fullfill the form");
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("ZENWANDER_TOKEN") || null);
      const request = {
        ...values,
        slug: slugify(values.title, { lower: true }),
        content,
        category: selectedCategory,
        status: selectedStatus,
        thumbnail: image,
        author: currentUser?._id,
      };

      const res = await updateBlogApi(token, id, request);
      toast.success(res?.message);
    } catch (error) {
      toast.error("Failed to update blog");
      console.log("Failed to update blog ->", error);
    }
  };

  return (
    <section>
      <TitleSection>Update blog #{id}</TitleSection>

      <div className="my-10 w-full max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(updateBlog)} className="space-y-5">
          {/* Thumbnail */}
          <div className="space-y-2">
            <label className="font-semibold text-lg" htmlFor="thumbnail">
              Thumbnail
            </label>
            {image ? (
              <div className="h-[300px] relative">
                <img
                  src={image}
                  alt="thumbnail"
                  className="object-cover w-full h-full rounded-lg"
                />

                <div
                  onClick={() => setImage("")}
                  className="flex cursor-pointer top-3 hover:bg-red-600 right-3 absolute items-center justify-center w-[35px] h-[35px] rounded-full bg-red-500"
                >
                  <X size={20} color="#fff" />
                </div>
              </div>
            ) : (
              <div>
                <UploadThumbnail
                  onChange={selectFile}
                  isUploading={isLoading}
                />
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="font-semibold text-lg" htmlFor="title">
              Title
            </label>
            <FieldInput
              type="text"
              name="title"
              icon={<Pen color="#3b82f6" size={25} />}
              register={register}
              errorMessage={errors?.title?.message}
              placeholder="Enter blog title..."
            />
          </div>

          {/* Desciption */}
          <div className="space-y-2">
            <label className="font-semibold text-lg" htmlFor="description">
              Description
            </label>
            <Textarea
              type="text"
              name="description"
              register={register}
              errorMessage={errors?.description?.message}
              placeholder="Enter blog description..."
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="font-semibold text-lg" htmlFor="category">
              Category
            </label>
            <ListboxRoot
              list={blogCategories}
              className="w-full"
              selected={selectedCategory}
              setSelected={setSelectedCategory}
              placeholder="Select category"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="font-semibold text-lg" htmlFor="status">
              Status
            </label>
            <ListboxRoot
              list={blogStatus}
              className="w-full"
              selected={selectedStatus}
              setSelected={setSelectedStatus}
              placeholder="Select status"
            />
          </div>

          <div className="w-full space-y-2">
            <label className="font-semibold text-lg" htmlFor="content">
              Content
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Updating blog..." : "Update blog"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default UpdateBlog;
