import React from "react";

const Tag = ({ text, className = "" }) => {
  return (
    <div className="flex">
      <p
        className={` p-2 text-xs text-white bg-blue-800 rounded-xl ${className}`}
      >
        {text}
      </p>
    </div>
  );
};

export default Tag;
