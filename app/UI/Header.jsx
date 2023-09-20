import React from "react";
import ProfilePopover from "../Components/ProfilePopup";
import MenuPopover from "../Components/MenuPopover";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-2">
      <MenuPopover />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-extrabold text-blue-800">Tech Orbit</h1>

        <h3 className="font-semibold text-blue-800">Read. Learn. Discover. </h3>
      </div>
      <ProfilePopover />
    </div>
  );
};

export default Header;
