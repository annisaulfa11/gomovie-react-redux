import SearchBar from "../SearchBar";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function Header() {
  const [bgColor, setBgColor] = useState("bg-gradient-to-b from-slate-900");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setBgColor("bg-gray-900");
      } else {
        setBgColor("bg-gradient-to-b from-slate-900");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty array ensures this effect runs only once

  return (
    <>
      <header className={`fixed z-50 top-0 left-0 right-0 py-3 px-12 ${bgColor}`}>
        <nav className="flex w-full items-center">
          <div className="mr-20">
            <h1 className="text-2xl font-bold text-blue-500">GOMOVIE</h1>
          </div>
          <ul className="flex w-full gap-x-5 text-white">
            <li>
              <Link to="/" className="hover:text-blue-400">Home</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-blue-400">Series</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-blue-400">Movies</Link>
            </li>
            <li> 
              <Link to="/" className="hover:text-blue-400">New & Popular</Link>
            </li>
          </ul>
          <SearchBar />
        </nav>
      </header>
    </>
  );
}
