import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl">Space Hub</h1>

      <button className="p-2 text-white bg-blue-800 rounded-xl hover:bg-blue-600 focus:ring-blue-300 active:bg-blue-400 ">
        More
      </button>
    </div>
  );
};

export default Header;
