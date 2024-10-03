import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const [bgColor, setBgColor] = useState("bg-gradient-to-b from-slate-900");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
      <header
        className={`fixed z-50 top-0 left-0 right-0 lg:py-3 lg:px-12 ${bgColor} s:px-5 s:py-1 sm:px-5 sm:py-1`}
      >
        <nav className="flex w-full items-center justify-between">
          <div className="mr-20 s:mr-5 sm:mr-10">
            <h1 className="text-2xl font-bold text-blue-500 s:text-sm">
              GOMOVIE
            </h1>
          </div>
          <div className="hidden s:flex w-full">
            <button
              className="text-white "
              onClick={toggleDropdown}
            >
              ☰
            </button>
          </div>
          <ul className={`flex w-full gap-x-5 text-white s:hidden`}>
            <li>
              <Link to="/gomovie-react-redux" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/gomovie-react-redux" className="hover:text-blue-400">
                Series
              </Link>
            </li>
            <li>
              <Link to="/gomovie-react-redux" className="hover:text-blue-400">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/gomovie-react-redux" className="hover:text-blue-400">
                New & Popular
              </Link>
            </li>
          </ul>
          <SearchBar />
        </nav>
        {isDropdownOpen && (
          <ul className="block w-full text-white bg-gray-900 mt-2">
            <li className="py-2 px-4">
              <Link to="/gomovie-react-redux" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li className="py-2 px-4">
              <Link to="/gomovie-react-redux" className="hover:text-blue-400">
                Series
              </Link>
            </li>
            <li className="py-2 px-4">
              <Link to="/gomovie-react-redux" className="hover:text-blue-400">
                Movies
              </Link>
            </li>
            <li className="py-2 px-4">
              <Link to="/gomovie-react-redux" className="hover:text-blue-400">
                New & Popular
              </Link>
            </li>
          </ul>
        )}
      </header>
    </>
  );
}
