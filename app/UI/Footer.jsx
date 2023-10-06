import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between p-4 mt-10 text-blue-800 border-t border-blue-400">
      <div className="flex flex-col items-center justify-center text-center border-r border-blue-400">
        <h1 className="text-xl font-extrabold">Tech Orbit</h1>
        <h3 className="font-semibold">Read. Learn. Discover.</h3>
      </div>
      <div className="pl-4 text-center">
        <div>© 2023 Tech Orbit. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
