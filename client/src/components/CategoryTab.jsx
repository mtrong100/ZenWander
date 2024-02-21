import React from "react";
import { blogCategories } from "../utils/constants";
import { displayCategoryBadge } from "../utils/helper";

const CategoryTab = () => {
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-5">Popular Categories</h1>
      <ul className="flex items-center gap-4 flex-wrap">
        {blogCategories.map((item) => (
          <li
            key={item.title}
            className={`${displayCategoryBadge(
              item.title
            )} uppercase rounded text-white font-semibold px-5 py-2 cursor-default flex items-center gap-2 hover:opacity-90`}
          >
            {item.icon}
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryTab;
