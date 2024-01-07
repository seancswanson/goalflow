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
      className="flex items-center gap-2 px-4 md:py-3 md:bg-white md:px-6"
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
    <nav className="w-full mb-8 bg-white border-t-[1.5px] border-b-[1.5px]">
      <div className="max-w-screen-lg mx-auto md:w-[90%] md:py-0  md:flex-row flex justify-between">
        <div className="py-3 border-l-[1.5px] border-r-[1.5px]">
          <Logo />
        </div>
        <div className="justify-between block px-4 py-3 border-l-[1.5px] border-r-[1.5px] md:items-center md:flex md:flex-row md:py-0">
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
