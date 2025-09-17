import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("login"); // tracks active button

  const scrollDown = () => {
    const section = document.getElementById("popular-categories");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const menuLinks = [
    { name: "Home", onClick: () => navigate("/") },
    { name: "Events", onClick: () => navigate("/products") },
    { name: "Categories", onClick: scrollDown },
    { name: "Create Event", onClick: () => navigate("/createEvent") },
    { name: "Contact Us", onClick: () => navigate("/contactUs") },
  ];

  return (
    <nav className="flex justify-between p-3 px-11 items-center text-white fixed top-0 left-0 right-0 z-10 bg-slate-900 shadow-md transition duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,0.7)]">
      {/* Logo */}
      <h1
        className="font-semibold text-lg pl-3 cursor-pointer z-20 animate-fadeIn transition duration-300 hover:text-blue-400"
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
            className="font-light cursor-pointer transition duration-300 hover:text-blue-400"
          >
            {link.name}
          </a>
        ))}

        {/* Combined Login/Signup buttons */}
        <div className="flex gap-2 bg-blue-500 rounded-4xl p-1">
          <button
            onClick={() => {
              setActive("login");
              navigate("/login");
            }}
            className={`px-3 py-1 rounded-4xl transition duration-300 ${
              active === "login"
                ? "hover:bg-black text-white"
                : "hover:bg-blue-600 hover:shadow-[0_0_12px_rgba(255,255,255,0.7)]"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setActive("signup");
              navigate("/signup");
            }}
            className={`px-3 py-1 rounded-4xl transition duration-300 ${
              active === "signup" ? "bg-black text-white" : "hover:bg-black"
            }`}
          >
            Sign up
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden text-white">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="transition duration-300 hover:shadow-[0_0_12px_rgba(255,255,255,0.7)] rounded-lg p-1"
        >
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
          <div className="text-white absolute right-3 top-16 flex flex-col gap-3 bg-slate-900 p-4 rounded-lg shadow-lg z-20 animate-fadeIn">
            {menuLinks.map((link) => (
              <a
                key={link.name}
                onClick={link.onClick}
                className="font-light cursor-pointer text-white transition duration-300 hover:text-blue-400 hover:shadow-[0_0_12px_rgba(255,255,255,0.7)] px-2 py-1 rounded-lg"
              >
                {link.name}
              </a>
            ))}

            {/* Same combined Login/Signup buttons for mobile */}
            <div className="flex gap-2 bg-blue-500 rounded-lg p-1">
              <button
                onClick={() => {
                  setActive("login");
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-lg transition duration-300 ${
                  active === "login"
                    ? " text-white"
                    : "hover:bg-blue-600 hover:shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setActive("signup");
                  navigate("/signup");
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-lg transition duration-300 ${
                  active === "signup"
                    ? "hover:bg-black text-white"
                    : "hover:bg-blue-600 hover:shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                }`}
              >
                Sign up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
