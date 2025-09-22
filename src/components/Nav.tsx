import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const image = localStorage.getItem("profileImage");
    if (token) {
      setIsLoggedIn(true);
      if (image) setProfileImage(image);
    }
  }, []);

  const menuLinks = [
    { name: "Home", onClick: () => navigate("/") },
    { name: "Events", onClick: () => navigate("/products") },
    {
      name: "Create Event",
      onClick: () => {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/createEvent");
        } else {
          alert("You must login or signup to create an event!");
          navigate("/login");
        }
      },
    },
    {
      name: "Contact Us",
      onClick: () => {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/contactUs");
        } else {
          alert("You must login or signup to create an event!");
          navigate("/login");
        }
      },
    },
    { name: "About Us", onClick: () => navigate("/aboutUs") }, // Added About Us
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

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full cursor-pointer flex items-center justify-center bg-blue-500 text-white text-lg hover:scale-110 transition transform shadow-md"
              onClick={() => navigate("/profile")}
              title="Profile"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                "👤"
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-2 bg-blue-500 rounded-4xl p-1">
            <button
              onClick={() => {
                setActive("login");
                navigate("/login");
              }}
              className={`px-3 py-1 rounded-4xl transition duration-300 transform ${
                active === "login"
                  ? "hover:bg-black text-white scale-105 "
                  : "hover:bg-black hover:scale-105"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setActive("signup");
                navigate("/signup");
              }}
              className={`px-3 py-1 rounded-4xl transition duration-300 transform ${
                active === "signup"
                  ? "bg-black text-white scale-105 "
                  : "hover:bg-black hover:scale-105 "
              }`}
            >
              Sign up
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
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

        {isMenuOpen && (
          <div className="text-white absolute right-3 top-16 flex flex-col gap-3 bg-slate-900 p-4 rounded-lg shadow-lg z-20 animate-fadeIn">
            {menuLinks.map((link) => (
              <a
                key={link.name}
                onClick={() => {
                  link.onClick();
                  setIsMenuOpen(false); // close menu on click
                }}
                className="font-light cursor-pointer text-white transition duration-300 hover:text-blue-400 hover:shadow-[0_0_12px_rgba(255,255,255,0.7)] px-2 py-1 rounded-lg"
              >
                {link.name}
              </a>
            ))}

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full cursor-pointer flex items-center justify-center bg-blue-500 text-white text-lg hover:scale-110 transition transform shadow-md"
                  onClick={() => navigate("/profile")}
                  title="Profile"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    "👤"
                  )}
                </div>
              </div>
            ) : (
              <div className="flex gap-2 bg-blue-500 rounded-lg p-1">
                <button
                  onClick={() => {
                    setActive("login");
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-lg transition duration-300 transform ${
                    active === "login"
                      ? "bg-black text-white scale-105 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                      : "hover:bg-black hover:scale-105 hover:shadow-[0_0_15px_rgba(0,0,0,0.8)]"
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
                  className={`px-3 py-1 rounded-lg transition duration-300 transform ${
                    active === "signup"
                      ? "bg-black text-white scale-105 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                      : "hover:bg-black hover:scale-105 hover:shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                  }`}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
