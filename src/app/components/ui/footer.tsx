import goalflowLogo from "@/assets/logo.png";
import swansongLogo from "@/assets/swansong-logo.png";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="px-4 py-8 mt-24 text-white bg-gray-800">
      <div className="container flex flex-col items-center justify-around gap-4 mx-auto sm:flex-row sm:items-start">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <div className="flex gap-2">
            <Image
              src={goalflowLogo}
              alt="App Logo"
              className="inline-block w-12 h-12"
            />
            <div className="bg-gray-100 opacity-20 h-10 w-[1px]" />
            <Image
              src={swansongLogo}
              alt="App Logo"
              className="inline-block w-12 h-12"
            />
          </div>
          <div className="flex flex-col text-xs text-center sm:text-left">
            <span>Goalflow was made with ♡</span>
            <a href="https://www.seancswanson.com" className="underline">
              by Sean Swanson
            </a>
          </div>
          <div className="flex flex-col text-xs text-center sm:text-left">
            <span>Questions? Issues? Updates?</span>
            <a href="/about" className="underline">
              visit the About page.
            </a>
          </div>
        </div>

        <div className="flex flex-col text-center sm:text-left">
          <span className="font-extrabold">Pages</span>
          <a href="/" className=" hover:text-gray-300">
            Home
          </a>
        </div>
      </div>
    </footer>
  );
};
