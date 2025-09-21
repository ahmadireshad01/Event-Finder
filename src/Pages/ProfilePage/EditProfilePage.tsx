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

export default function EditProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const DEFAULT_IMAGE = "/images/default-profile.png";

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) navigate("/login", { replace: true });

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8000/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data.user);
        setName(data.user.name);
        setEmail(data.user.email);
        setDescription(data.user.description || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const token = localStorage.getItem("token");
    const updatedUser = { ...user, name, description };

    try {
      await fetch(`http://localhost:8000/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (!user) return <p className="text-white pt-20 text-center">Loading...</p>;

  return (
    <>
      <Nav />
      <div className="text-white min-h-screen flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-xl space-y-8 text-center">
          <h1 className="text-3xl font-semibold">Edit Profile</h1>
          <img
            className="w-24 h-24 mx-auto mb-4 rounded-full object-cover"
            src={user.image || DEFAULT_IMAGE}
            alt="Profile"
          />

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="w-full bg-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                value={email}
                type="email"
                disabled
                className="w-full bg-gray-600 rounded-md p-2 text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-28 bg-gray-700 rounded-md p-2 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition duration-200"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
