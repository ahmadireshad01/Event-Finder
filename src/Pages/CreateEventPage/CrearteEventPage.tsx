import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { eventData } from "../../data/event-data";
import Nav from "../../components/Nav";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [catagory, setCatagory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Check login on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login first to create an event!");
      navigate("/login");
    }
  }, [navigate]);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEvent = {
      id: (eventData.length + 1).toString(),
      catagory,
      title,
      description,
      date: new Date(date),
      time,
      location,
      organizationName,
      image: file,
    };

    console.log("Event created:", newEvent);

    // Reset fields after submit
    setTitle("");
    setDescription("");
    setCatagory("");
    setDate("");
    setTime("");
    setLocation("");
    setOrganizationName("");
    setContactInfo("");
    setFile(null);
    setPreview(null);
  };

  return (
    <>
      <Nav />
      <div className="text-white min-h-screen flex justify-center pt-34 py-10">
        <div className="w-full max-w-2xl space-y-6 px-10">
          <h1 className="text-3xl font-semibold mb-6">Create Event</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium">Event Title</label>
              <input
                type="text"
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-700 border border-gray-700 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-24 bg-gray-700 border border-gray-700 rounded-md p-2 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                value={catagory}
                onChange={(e) => setCatagory(e.target.value)}
                className="w-full bg-gray-700 border border-gray-700 rounded-md p-2"
              >
                <option value="">Select category</option>
                <option value="Conference">Conference</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Webinar">Webinar</option>
                <option value="Networking">Networking</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-gray-700 border border-gray-700 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-gray-700 border border-gray-700 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-gray-700 border border-gray-700 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Organizer Name</label>
              <input
                type="text"
                placeholder="Enter organizer name"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-700 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Contact Information
              </label>
              <input
                type="text"
                placeholder="Email or phone number"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full bg-gray-700 border border-gray-700 rounded-md p-2"
              />
            </div>

            <div className="border border-dashed border-gray-600 bg-[#1e1f24] rounded-md p-6 text-center hover:border-blue-500 cursor-pointer">
              <p className="text-sm font-semibold text-white mb-1">
                Upload Event Image
              </p>
              <input type="file" onChange={handleFileChange} />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: 200, marginTop: 10 }}
                />
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
