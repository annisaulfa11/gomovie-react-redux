import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" pt-10 gap-y-20 flex flex-col">
      <div className="relative flex s:flex-col s:justify-center items-center s:gap-y-10 gap-x-16 s:text-center p-12 sm:p-20 justify-between bg-[url('/src/assets/footer.png')] text-white s:h-80 s:bg-cover ">
        <div className="z-20">
          <h3 className="text-2xl font-semibold mb-5">
            Start your free trial today!
          </h3>
          <p className="text-gray-400">
            This is a clear and concise call to action that encourages users to
            sign up for a free trial of Gomovie.
          </p>
        </div>
        <button className="z-20 bg-blue-600 py-2 rounded-md w-56 min-w-40 mx-auto h-12">
          Start a Free Trial
        </button>
        <div className="absolute inset-0 footer-gradient z-10"></div>
      </div>
      <div className="bg-black  s:px-6 px-20 flex flex-col gap-y-10">
        <div className=" flex flex-wrap py-24 gap-x-24 gap-y-10 ">
          <div className="text-gray-500  flex flex-col gap-y-2 flex-1">
            <Link className="text-white">Home</Link>
            <p>Categories</p>
            <p>Devices</p>
            <p>Pricing</p>
            <p>FAQ</p>
          </div>
          <div className="text-gray-500  flex flex-col gap-y-2 flex-1">
            <Link className="text-white">Shows</Link>
            <p>Genres</p>
            <p>Trending</p>
            <p>New Release</p>
            <p>Popular</p>
          </div>
          <div className="text-gray-500  flex flex-col gap-y-2 flex-1">
            <Link className="text-white">Movies</Link>
            <p>Genres</p>
            <p>Trending</p>
            <p>New Release</p>
            <p>Popular</p>
          </div>
          <div className="text-gray-500  flex flex-col gap-y-2 flex-1">
            <Link className="text-white">Support</Link>
            <p>Contact Us</p>
          </div>
          <div className="text-gray-500  flex flex-col gap-y-2 flex-1">
            <Link className="text-white">Subscription</Link>
            <p>Plans</p>
            <p>Features</p>
          </div>
          <div className="text-gray-500  flex flex-col gap-y-2 flex-1">
            <Link className="text-white">Connect With Us</Link>
            <div className="flex gap-x-3">
              <p className="outline outline-black-200 bg-black-600 w-fit px-1 rounded-md">
                <i className="bx bxl-facebook-circle text-white leading-normal"></i>
              </p>
              <p className="outline outline-black-200 bg-black-600 w-fit px-1 rounded-md">
                <i className="bx bxl-twitter text-white leading-normal"></i>
              </p>
              <p className="outline outline-black-200 bg-black-600 w-fit px-1 rounded-md">
                <i className="bx bxl-linkedin-square text-white leading-normal"></i>
              </p>
            </div>
          </div>
        </div>
        <div className="pb-5 border-t-2 border-t-black-600  pt-3 text-gray-500 flex justify-between s:flex-col gap-y-3">
          <div>
            <p>@2024 gomovie, All Rights Reserved</p>
          </div>
          <div className="flex gap-x-5">
            <p className=" border-r-2 border-r-black-600 pr-5">Terms of Use</p>
            <p className=" border-r-2 border-r-black-600 pr-5">Privacy Policy</p>
            <p>Cookie Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
