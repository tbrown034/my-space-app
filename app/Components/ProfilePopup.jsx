"use client";

import React from "react";
import { Popover } from "@headlessui/react";
import { UserCircleIcon as UserCircleOutlineIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon as UserCircleSolidIcon } from "@heroicons/react/24/solid";

import Link from "next/link";

const ProfilePopup = () => {
  return (
    <div className="relative">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button className="focus:outline-none">
              {/* Conditional rendering of icons */}
              {open ? (
                <UserCircleSolidIcon className="w-8 h-8 text-blue-500" />
              ) : (
                <UserCircleOutlineIcon className="w-8 h-8 text-blue-800 hover:text-blue-500" /> // changed hover color to a standard Tailwind blue
              )}
            </Popover.Button>
            <Popover.Panel className="absolute z-10 flex flex-col gap-2 p-2 text-white bg-blue-800 rounded-2xl right-4 opacity-90 top-8">
              <Link className="hover:text-slate-400" href="/logIn">
                Log In
              </Link>
              <Link className="hover:text-slate-400" href="/register">
                Register
              </Link>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default ProfilePopup;
