export const displayCategoryBadge = (value) => {
  switch (value) {
    case "education":
      return "bg-orange-600";
    case "coding":
      return "bg-black";
    case "technology":
      return "bg-violet-600";
    case "fashion":
      return "bg-pink-600";
    case "travel":
      return "bg-green-600";
    case "sports":
      return "bg-indigo-600";

    default:
      break;
  }
};
