// Importing necessary modules and assets
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, UserCircle } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import wavyArrow from "@/assets/wavy-arrow.png";

type MenuItem = {
  title: string;
  path: string;
};

// Standalone HamburgerButton component
function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="md:hidden">
      <button
        className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
        onClick={onClick}
      >
        <Menu />
      </button>
    </div>
  );
}

// Logo component
function Logo() {
  return (
    <Link
      href={"/"}
      className="flex items-center gap-2 md:py-3 md:bg-white md:border-[1.5px] px-4 md:px-6 md:border-black md:rounded-full md:border-opacity-20 md:shadow-md"
    >
      <Image src={logo} alt="GoalFlow Logo" width={40} />
      <div className="relative w-min">
        <h1 className="text-xl font-bold">Goalflow</h1>
        <Image
          src={wavyArrow}
          alt="wavy arrow underline"
          height={10}
          className="absolute bottom-[-2px] w-full"
        />
      </div>
    </Link>
  );
}

// MobileNavDrawer component
function MobileNavDrawer({
  isMenuActive,
  menuItems,
}: {
  isMenuActive: boolean;
  menuItems: MenuItem[];
}) {
  if (!isMenuActive) return null;

  return (
    <div className="flex-1 block pb-3 mt-8 justify-self-center md:pb-0 md:mt-0">
      {/* <ul className="justify-end space-y-8 md:space-x-6 md:space-y-0 md:hidden">
        {menuItems.map((item, idx) => (
          <li key={idx} className="text-gray-600 hover:text-indigo-600">
            <Link href={item.path}>{item.title}</Link>
          </li>
        ))}
      </ul> */}
      <Link href="/login">
        <UserCircle className="flex-none w-5 h-5 text-gray-600 transition-colors hover:text-gray-900" />
      </Link>
    </div>
  );
}

// Main Navbar component
export default function Navbar() {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const menuItems: MenuItem[] = [
    { title: "Home", path: "/home" },
    { title: "Blog", path: "/blog" },
    { title: "About Us", path: "/about" },
    { title: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="w-full mb-8 bg-white border-b md:border-0 md:bg-transparent">
      <div className="max-w-screen-lg mx-auto md:w-[90%] py-3 md:p-0  md:mt-5 md:flex-row flex justify-between">
        <Logo />
        <div className="px-4 md:px-6 md:items-center md:flex block  md:flex-row justify-between md:bg-white md:border-[1.5px] md:border-black md:rounded-full md:border-opacity-20 md:shadow-md">
          <HamburgerButton onClick={() => setIsMenuActive(!isMenuActive)} />
          {/* <ul className="hidden gap-6 mr-6 md:flex">
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                className="text-gray-600 transition-colors hover:text-gray-900"
              >
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
          </ul> */}
          <Link href="/login" className="hidden md:block">
            <UserCircle className="flex-none w-5 h-5 text-gray-600 transition-colors hover:text-gray-900" />
          </Link>
        </div>
      </div>
      <MobileNavDrawer isMenuActive={isMenuActive} menuItems={menuItems} />
    </nav>
  );
}
