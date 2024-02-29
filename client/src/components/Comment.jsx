import React from "react";

const Comment = () => {
  return (
    <div className="flex items-start mb-4">
      <img
        src="https://source.unsplash.com/random"
        alt="User Avatar"
        className="w-[40px] h-[40px] rounded-full mr-3"
      />
      <div className="bg-gray-100 w-full border border-gray-300 rounded-lg p-3">
        <h1 className="font-semibold">Crowbar</h1>
        <p className="text-gray-800">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
          libero nec magna convallis fringilla vel vel lacus.
        </p>
        <span className="text-gray-600 text-sm mt-1">2 minutes ago</span>
      </div>
    </div>
  );
};

export default Comment;
