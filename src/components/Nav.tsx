import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollDown = () => {
    window.scrollBy({ top: 600, behavior: "smooth" });
    setIsMenuOpen(false); // Close menu after click
  };

  const menuLinks = [
    { name: "Home", onClick: () => navigate("/") },
    { name: "Events", onClick: () => navigate("/products") },
    { name: "Categories", onClick: scrollDown },
    { name: "Submit Event", onClick: () => navigate("/createEvent") },
    { name: "Contact", onClick: () => navigate("/contactUs") },
  ];

  return (
    <nav className="flex justify-between p-3 px-11 border-b items-center text-white fixed top-0 left-0 right-0 z-10 bg-slate-900 shadow-md">
      {/* Logo */}
      <h1
        className="font-semibold text-lg pl-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        LocalEventFinder
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        {menuLinks.map((link) => (
          <a
            key={link.name}
            onClick={link.onClick}
            className="font-light cursor-pointer  hover:text-blue-400 transition"
          >
            {link.name}
          </a>
        ))}
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600"
        >
          Sign up
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {/* Hamburger Icon */}
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

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-3 top-16 flex flex-col gap-3 bg-slate-900 p-4 rounded-lg shadow-lg z-20 animate-fadeIn">
            {menuLinks.map((link) => (
              <a
                key={link.name}
                onClick={link.onClick}
                className="font-light cursor-pointer hover:text-blue-400 transition"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
