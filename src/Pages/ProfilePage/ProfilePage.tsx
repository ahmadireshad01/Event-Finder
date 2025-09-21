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

// Function to decode JWT token and get user ID
const getUserIdFromToken = (token: string): string | null => {
  try {
    // JWT tokens are in format: header.payload.signature
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
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

  const DEFAULT_IMAGE = "/images/default-profile.png";

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      
      // Get token from localStorage
      const token = localStorage.getItem("token");

      console.log("Token from localStorage:", token);

      if (!token) {
        console.log("No token found, redirecting to login");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 500);
        return;
      }

      try {
        // Extract user ID from the token
        const userId = getUserIdFromToken(token);
        
        if (!userId) {
          throw new Error("Could not extract user ID from token");
        }

        console.log("User ID from token:", userId);
        // Use your existing endpoint: /users/{id}
        const res = await fetch(`http://172.30.10.42:8000/users/${userId}`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        console.log("API Response status:", res.status);

        if (res.status === 401 || res.status === 403) {
          // Invalid or expired token
          console.log("Token expired or invalid");
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        if (!res.ok) {
          const errorText = await res.text();
          console.error("API Error:", res.status, errorText);
          throw new Error(`Failed to fetch user data: ${res.status}`);
        }

        const data = await res.json();
        console.log("API Response data:", data);
        
        const userData = data.user || data;

        setUser({
          ...userData,
          image: userData.image || DEFAULT_IMAGE,
        });

      } catch (err) {
        console.error("Fetch error:", err);
        // Unexpected error
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
        <p className="text-gray-400 text-sm">{user?.description || "No description provided"}</p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => navigate("/edit-profile")}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}