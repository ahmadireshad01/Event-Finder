import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileInfo } from "../data/profileInfo";

export default function ProductsNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between p-4 border-b fixed top-0 right-0 left-0 z-20  bg-slate-900 hover:shadow-lg shadow-slate-600 ease-in-out transition duration-300">
      <div className="flex items-center gap-4 pl-5">
        <img
          className="w-2"
          src="./public/images/navimg/profilePageLeftImg.svg"
          alt=""
        />
        <h1 className="font-semibold ">LocalEventFinder</h1>
        <div className="flex font-light gap-6 max-md:hidden">
          <a onClick={() => navigate("/")} className="cursor-pointer">
            Home
          </a>
          <a onClick={() => navigate("/products")} className="cursor-pointer">
            catagories
          </a>

          <a className="cursor-pointer">About Us</a>
        </div>
      </div>
      <div className="flex items-center gap-8 pr-3">
        <button
          onClick={() => navigate("/createEvent")}
          className="max-md:hidden bg-blue-500 h-9 rounded-lg w-29 p-1 hover:opacity-70 transition ease-in-out"
        >
          Create Event
        </button>
        <img
          onClick={() => navigate("/profile")}
          className="w-9 max-md:hidden"
          src={profileInfo.image}
          alt=""
        />
      </div>
      <div className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="flex flex-col gap-7 absolute top-18 right-3 bg-slate-900 p-5 rounded-lg shadow-lg z-20">
          <img
            className="w-9"
            src="./public/images/navimg/profilePic.svg"
            alt=""
          />
          <a className="cursor-pointer">Home</a>
          <a className="cursor-pointer">catagories</a>
          <a className="cursor-pointer">About Us</a>
          <button className=" bg-blue-500 h-9 rounded-lg w-29 p-1 hover:opacity-70 transition ease-in-out">
            Create Event
          </button>
        </div>
      )}
    </nav>
  );
}
