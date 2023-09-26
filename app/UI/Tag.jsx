import React from "react";

const Tag = ({ text, className = "" }) => {
  return (
    <div className="flex">
      <p
        className={` px-2 m-2 py-1 text-xs opacity-90 text-white bg-blue-800 rounded-xl ${className}`}
      >
        {text}
      </p>
    </div>
  );
};

export default Tag;
