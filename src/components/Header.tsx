import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between px-4 py-5 md:px-24 max-w-[1000px] mx-auto">
      <Link href={"/"} className="text-2xl font-bold">
      The Blog Diary
      </Link>

      <nav>
        <ul className="flex gap-4">
          <li className="hover:underline cursor-pointer">About</li>
          <li className="hover:underline cursor-pointer">Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;