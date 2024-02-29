import React from "react";
import { format } from "timeago.js";
import Skeleton from "./Skeleton";

const Comment = ({ data, onUpdate, onDelete }) => {
  return (
    <div className="flex items-start mb-4">
      <img
        src={data?.user?.avatar}
        alt={data?.user?.name}
        className="w-[40px] h-[40px] rounded-full mr-3 flex-shrink-0"
      />

      <div className="w-full">
        <div className="bg-gray-100 w-full border border-gray-300 rounded-lg p-3">
          <h1 className="font-semibold">{data?.user?.name}</h1>
          <p className="text-gray-800">{data?.content}</p>
          <span className="text-primary font-semibold text-sm mt-2">
            {format(data?.createdAt)}
          </span>
        </div>

        <div className="text-sm font-medium flex pl-1 mt-1 items-center gap-3">
          <button
            onClick={() => onUpdate(data)}
            className="text-green-500 hover:text-green-600"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(data?._id)}
            className="text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;

export const CommentSkeleton = () => {
  return (
    <div className="flex items-start mb-4">
      <Skeleton className="w-[40px] h-[40px] rounded-full mr-3 flex-shrink-0" />
      <Skeleton className="w-full h-[150px] rounded-lg" />
    </div>
  );
};
