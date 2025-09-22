import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";

interface User {
  id: string;
  name: string;
  email: string;
  description?: string;
  image?: string;
}

const getUserIdFromToken = (token: string): string | null => {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const payloadObj = JSON.parse(decodedPayload);
    return payloadObj.id || payloadObj.userId || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const DEFAULT_PROFILE_SVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-20 h-20 text-gray-500"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
    </svg>
  );

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setTimeout(() => navigate("/login", { replace: true }), 500);
        return;
      }

      try {
        const userId = getUserIdFromToken(token);
        if (!userId) throw new Error("Could not extract user ID from token");

        const res = await fetch(`http://172.30.10.42:8000/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok)
          throw new Error(`Failed to fetch user data: ${res.status}`);

        const data = await res.json();
        const userData = data.user || data;
        setUser({
          ...userData,
          image: userData.image || null,
        });
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-gray-300">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Nav />
      <div className="pt-24 flex flex-col items-center px-4">
        {/* Profile Card */}
        <div className="bg-slate-700 w-full max-w-2xl rounded-2xl shadow-xl p-8 flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center mb-4">
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              DEFAULT_PROFILE_SVG
            )}
          </div>

          {/* Name and Email */}
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-gray-400">{user?.email}</p>
          <p className="text-gray-500 mt-2 text-sm">
            {user?.description || "No description provided"}
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => navigate("/edit-profile")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full shadow-md transition"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full shadow-md transition"
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex mt-8 w-full justify-center gap-8 border-b border-gray-700 pb-2">
            <button className="text-blue-400 font-medium border-b-2 border-blue-400">
              Saved Events
            </button>
            <button className="text-gray-400 hover:text-white">
              Past Events
            </button>
          </div>

          {/* Example Saved Events Section */}
          <div className="mt-6 w-full flex flex-col gap-4">
            <div className="bg-[#333] p-4 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Community Art Fair</h3>
                <p className="text-sm text-gray-400">Tomorrow · 10:00 AM</p>
              </div>
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-lg text-sm">
                View Event
              </button>
            </div>

            <div className="bg-[#333] p-4 rounded-xl flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Tech Meetup: Future of AI</h3>
                <p className="text-sm text-gray-400">Next Week</p>
              </div>
              <button className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-lg text-sm">
                View Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
