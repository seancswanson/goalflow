"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, UserCircle } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import wavyArrow from "@/assets/wavy-arrow.png";
export default function Navbar() {
  const [isMobile, setState] = useState(false);
  const menus = [
    { title: "Home", path: "/your-path" },
    { title: "Blog", path: "/your-path" },
    { title: "About Us", path: "/your-path" },
    { title: "Contact Us", path: "/your-path" },
  ];
  return (
    <nav className="w-full mb-8 bg-white border-b md:border-0 md:bg-transparent">
      <div className="items-center max-w-screen-lg shadow-md md:w-[97%] md:bg-white md:border-[1.5px] md:border-black md:rounded-full md:border-opacity-25 px-4 mx-auto md:mt-5 md:flex md:px-6">
        <div className="flex items-center justify-between py-3 md:py-3 md:block">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="GoalFlow Logo" width={40} />
            <div className="relative w-min">
              <h1 className="text-xl font-bold ">Goalflow</h1>
              <Image
                src={wavyArrow}
                alt="wavy arrow underline"
                height={10}
                className="absolute bottom-[-2px] w-full"
              />
            </div>
          </Link>
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
              onClick={() => setState(!isMobile)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            isMobile ? "block" : "hidden"
          }`}
        >
          <ul className="items-center justify-end space-y-8 md:flex md:space-x-6 md:space-y-0">
            {/* {menus.map((item, idx) => (
              <li key={idx} className="text-gray-600 hover:text-indigo-600">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))} */}
            <Link href="/login">
              <UserCircle className="flex-none w-5 h-5 text-gray-300" />
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
