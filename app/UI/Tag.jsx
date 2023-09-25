import React from "react";

const Tag = ({ text }) => {
  return (
    <div className="inline-block p-0.5 px-2 text-sm font-bold text-semibold bg-slate-300 rounded-3xl">
      <p className="text-xs">{text}</p>
    </div>
  );
};

export default Tag;
