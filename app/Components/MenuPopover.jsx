"use client";

import React from "react";
import { Popover } from "@headlessui/react";
import { Bars3Icon as Bars3OutlineIcon } from "@heroicons/react/24/outline";
import { Bars3Icon as Bars3SolidIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const MenuPopover = () => {
  return (
    <div className="relative">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button className="focus:outline-none">
              {/* Conditional rendering of icons */}
              {open ? (
                <Bars3SolidIcon className="w-8 h-8 text-blue-500" />
              ) : (
                <Bars3OutlineIcon className="w-8 h-8 text-blue-800 hover:text-blue-500" />
              )}
            </Popover.Button>
            <Popover.Panel className="absolute z-10 flex flex-col gap-2 p-2 text-white bg-blue-800 rounded-2xl left-4 top-8 opacity-90">
              <Link className="hover:text-slate-400" href="/home">
                Home
              </Link>
              <Link className="hover:text-slate-400" href="/about">
                About
              </Link>
              <Link className="hover:text-slate-400" href="/contact">
                Contact
              </Link>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  );
};

export default MenuPopover;
