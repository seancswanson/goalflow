import React from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const Navbar = () => {
  return (
    <>
      <div className=" w-11/12 mx-auto py-2 rounded-lg bg-slate-800 sticky top-10 mb-12">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="left">
              <Logo></Logo>
            </div>
            <h1>Goal Flow</h1>
            <div className="right flex gap-6">
              <button className="border px-2 rounded">Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
