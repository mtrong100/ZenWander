import React from "react";

const BlogBadge = () => {
  const displayBadge = (value) => {
    switch (value) {
      case "education":
        return "bg-orange-600 text-orange-600";
      case "coding":
        return "bg-black text-black";
      case "technology":
        return "bg-violet-600 text-violet-600";
      case "fashion":
        return "bg-pink-600 text-pink-600";
      case "travel":
        return "bg-green-600 text-green-600";
      case "sports":
        return "bg-indigo-600 text-indigo-600";

      default:
        break;
    }
  };

  return (
    <span
      className={`${displayBadge(
        "education"
      )} text-xs bg-opacity-10 capitalize py-2 font-bold rounded-xl px-4`}
    >
      {"education"}
    </span>
  );
};

export default BlogBadge;
