import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";

interface User {
  id: string;
  name: string;
  email: string;
  description?: string;
  image?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const DEFAULT_IMAGE = "/images/default-profile.png";

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        const userData = data.user || data;

        setUser({
          ...userData,
          image: userData.image || DEFAULT_IMAGE,
        });
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Nav />
      <div className="pt-24 flex flex-col items-center">
        <img
          className="w-24 h-24 mx-auto mb-6 rounded-full object-cover"
          src={user?.image || DEFAULT_IMAGE}
          alt="Profile"
        />
        <h2 className="text-2xl font-bold mb-2">{user?.name}</h2>
        <p className="text-gray-300 mb-2">{user?.email}</p>
        <p className="text-gray-400 text-sm">{user?.description}</p>

        <button
          onClick={() => navigate("/edit-profile")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
