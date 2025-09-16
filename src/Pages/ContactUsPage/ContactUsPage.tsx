import Nav from "../../components/Nav";
import React from "react";
import { useState } from "react";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    console.log("Form submitted");
  };

  return (
    <>
      <Nav />
      <div className=" text-white min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-xl space-y-8 text-center">
          <h1 className="text-2xl font-semibold">Get in Touch</h1>

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
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
              <label className="block mb-1 font-medium">Subject</label>
              <input
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Subject"
                className="w-full bg-gray-700 rounded-md p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
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
