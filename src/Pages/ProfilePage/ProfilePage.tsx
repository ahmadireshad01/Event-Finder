import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"saved" | "past">("saved");
  const [user, setUser] = useState<User | null>(null);
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        // اگر اصلاً توکن یا userId نیست، مستقیم redirect
        navigate("/login", { replace: true });
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401 || res.status === 403) {
          // توکن نامعتبر یا منقضی
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login", { replace: true });
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setUser(data.user);

        // Mock events
        setSavedEvents([
          { id: 1, title: "Tech Conference 2023", date: "2023-10-15", location: "San Francisco", image: "" },
          { id: 2, title: "Music Festival", date: "2023-11-20", location: "Austin", image: "" },
        ]);
        setPastEvents([
          { id: 3, title: "Art Exhibition", date: "2023-05-10", location: "New York", image: "" },
          { id: 4, title: "Food & Wine Tasting", date: "2023-07-22", location: "Napa Valley", image: "" },
        ]);
      } catch (err) {
        console.error(err);
        // خطای غیرمنتظره
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      setUser(null);
      setIsLoggingOut(false);
      navigate("/login", { replace: true });
    }, 1000);
  };

  if (isLoading || isLoggingOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-white text-lg">{isLoggingOut ? "Logging out..." : "Loading your profile..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <Nav />

      <div className="pt-24 flex flex-col items-center pb-12">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border border-gray-700 transform hover:scale-105 transition-transform duration-300">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-3xl font-bold">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
          <p className="text-gray-300 mb-2">{user?.email}</p>
          <p className="text-gray-400 text-sm">User ID: {user?.id}</p>
        </div>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
