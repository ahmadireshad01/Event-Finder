import Nav from "../../components/Nav";
import React from "react";
import { useState } from "react";
import { setProfileInfo, profileInfo } from "../../data/profileInfo";

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newInfo = { name: name, description: description, image: image };
    setProfileInfo(newInfo);
    console.log(newInfo);
  };

  return (
    <>
      <Nav />
      <div className=" text-white min-h-screen flex items-center justify-center px-4 py-44">
        <div className="w-full max-w-xl space-y-8 text-center ">
          <h1 className="text-3xl font-semibold">Edit Profile</h1>
          <img className="w-2xs ml-[7.6vw]" src={profileInfo.image} alt="" />

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            <div>
              <label className="block mb-1 font-medium">edit Image</label>
              <input
                onChange={(e) => setImage(e.target.value)}
                type="file"
                placeholder="Your Name"
                className="w-full bg-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your Name"
                className="w-full bg-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your Email"
                className="w-full bg-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="Password"
                className="w-full bg-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 font-medium">description</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Your Information"
                className="w-full h-28 bg-gray-700 rounded-md p-2 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Alternative contact text */}
          <p className="text-xs text-gray-400 mt-2">
            Alternatively, you can reach us directly at{" "}
            <a href="mailto:support@localevents.com" className="underline">
              support@localevents.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
