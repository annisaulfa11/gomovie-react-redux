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
        setBgColor("bg-black");
      } else {
        setBgColor("bg-gradient-to-b from-black");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed z-50 top-0 left-0 right-0 py-6 px-20 h-20 items-center s:px-6 ${bgColor} transition-colors duration-300`}
    >
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-extrabold text-blue-500 lg:mr-20 s:mr-5 sm:mr-10">
          GOMOVIE
        </div>

        <div className="lg:hidden">
          <button
            className="text-white text-2xl focus:outline-none"
            onClick={toggleDropdown}
          >
            ☰
          </button>
        </div>

        {/* Navigation menu for larger screens */}
        <ul className="hidden lg:flex lg:items-center sm:gap-x-5 text-white">
          <li>
            <Link to="/gomovie-react-redux" className="hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/gomovie-react-redux" className="hover:text-blue-400">
              Movies & Shows
            </Link>
          </li>
          <li>
            <Link to="/gomovie-react-redux" className="hover:text-blue-400">
              Support
            </Link>
          </li>
          <li>
            <Link to="/gomovie-react-redux" className="hover:text-blue-400">
              Subscription
            </Link>
          </li>
        </ul>

        {/* SearchBar for larger screens */}
        <div className="hidden lg:block">
          <SearchBar />
        </div>
      </nav>

      {/* Dropdown menu for small screens */}
      {isDropdownOpen && (
        <div className="mt-4  lg:hidden   items-end flex flex-col">
          <ul className="flex flex-col text-center text-white w-52 bg-black rounded-lg items-center">
            <li className="py-2 ">
              <Link
                to="/gomovie-react-redux"
                className="block px-4 hover:text-blue-400"
                onClick={toggleDropdown}
              >
                Home
              </Link>
            </li>
            <li className="py-2 ">
              <Link
                to="/gomovie-react-redux"
                className="block px-4 hover:text-blue-400"
                onClick={toggleDropdown}
              >
                Movies & Shows
              </Link>
            </li>
            <li className="py-2 ">
              <Link
                to="/gomovie-react-redux"
                className="block px-4 hover:text-blue-400"
                onClick={toggleDropdown}
              >
                Support
              </Link>
            </li>
            <li className="py-2">
              <Link
                to="/gomovie-react-redux"
                className="block px-4 hover:text-blue-400"
                onClick={toggleDropdown}
              >
                Subscription
              </Link>
            </li>
            <div className="py-2 flex s:ml-0">
            <SearchBar />
          </div>
          </ul>
          
        </div>
      )}
    </header>
  );
}
