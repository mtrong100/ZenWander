import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteBlogApi, getAllBlogsApi } from "../api/blogApi";
import { storeBlogs } from "../redux/slices/blogSlice";
import { format } from "timeago.js";
import { Eye, Pencil, Trash2 } from "lucide-react";

// eslint-disable-next-line react/display-name
const BlogTable = forwardRef((_, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog);

  const deleteBlog = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = JSON.parse(localStorage.getItem("ZENWANDER_TOKEN") || "");
        await deleteBlogApi(id, token);
        const data = await getAllBlogsApi(token);
        dispatch(storeBlogs(data?.docs));
        Swal.fire("Deleted!", "Data has been deleted.", "success");
      }
    });
  };

  return (
    <div className="overflow-x-auto mt-5">
      <table ref={ref} className="table-auto w-full border-collapse ">
        <thead>
          <tr className="bg-white text-left">
            <th className="p-4 border w-[450px]">Title</th>
            <th className="p-4 border">Author</th>
            <th className="p-4 border">Category</th>
            <th className="p-4 border">Status</th>
            <th className="p-4 border">Date</th>
            <th className="p-4 border text-right w-[150px]">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-slate-100" : "bg-white"}
            >
              <td className="border p-4 capitalize">{item?.title}</td>
              <td className="border p-4 capitalize">{item?.author?.name}</td>
              <td className="border p-4 capitalize">{item?.category}</td>
              <td className="border p-4 capitalize">{item?.status}</td>
              <td className="border p-4">{format(item?.createdAt)}</td>
              <td className="border p-4">
                <div className="flex items-center justify-end gap-5">
                  <Eye
                    size={22}
                    className="cursor-pointer hover:opacity-80 text-gray-500 hover:text-primary"
                  />
                  <Pencil
                    onClick={() => navigate(`/update-blog/${item?._id}`)}
                    size={22}
                    className="cursor-pointer hover:opacity-80 text-gray-500 hover:text-primary"
                  />
                  <Trash2
                    onClick={() => deleteBlog(item?._id)}
                    size={22}
                    className="cursor-pointer hover:opacity-80 text-gray-500 hover:text-primary"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default BlogTable;
