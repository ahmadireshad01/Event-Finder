import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab based on current pathname
  const path = location.pathname.toLowerCase();
  const [activeTab, setActiveTab] = useState<"login" | "signup">(
    path.includes("signup") ? "signup" : "login"
  );

  // When route changes, update activeTab
  useEffect(() => {
    if (path.includes("signup")) {
      setActiveTab("signup");
    } else {
      setActiveTab("login");
    }
  }, [path]);

  // Tab click handler: change URL & active tab
  const handleTabClick = (tab: "login" | "signup") => {
    setActiveTab(tab);
    if (tab === "login") {
      navigate("/Login");
    } else {
      navigate("/Signup");
    }
  };

  return (
    <div>
      <div className="h-screen flex items-center justify-center p-6 ">
        <div className="w-full max-w-md rounded-md p-8 text-gray-300 ">
          {/* Tabs */}
          <div className="flex border-b border-gray-700 mb-6">
            <button
              className={`flex-1 py-2 text-center text-lg font-semibold ${
                activeTab === "login"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabClick("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-center text-lg font-semibold ${
                activeTab === "signup"
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabClick("signup")}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          {activeTab === "login" ? (
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-400"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm text-gray-400"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-1 text-xs text-blue-400 cursor-pointer hover:underline">
                  Forgot Password?
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-md text-white font-semibold hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>
          ) : (
            <form className="space-y-6">
              {/* Example Sign Up form */}
              <div>
                <label
                  htmlFor="email-name"
                  className="block mb-2 text-sm text-gray-400"
                >
                  Name
                </label>
                <input
                  id="email-name"
                  type="name"
                  placeholder="Full name"
                  className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email address"
                  className="block mb-2 text-sm text-gray-400"
                >
                  Email address
                </label>
                <input
                  id="email address"
                  type="email address"
                  placeholder="Email address"
                  className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password-signup"
                  className="block mb-2 text-sm text-gray-400"
                >
                  Password
                </label>
                <input
                  id="password-signup"
                  type="email address"
                  placeholder="Email address"
                  className="w-full px-4 py-2 bg-gray-700 rounded-md border border-gray-600 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-md text-white font-semibold hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
