import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
    errors?: Array<{ field: string; message: string }>;
  }>({ type: null, message: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login first to create an event!");
      navigate("/login");
    }
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Convert file to base64
      let base64File = "";
      if (file) {
        base64File = await convertToBase64(file);
      }

      // Prepare data for API
      const eventData = {
        eventTitle: title,
        description,
        category,
        date: new Date(date).toISOString().split("T")[0],
        time,
        location,
        organizerName: organizationName,
        contactInformation: contactInfo,
        myFile: base64File,
      };

      const token = localStorage.getItem("token");

      // Try to send to API first
      let apiSuccess = false;
      try {
        const response = await fetch(
          "http://172.30.10.42:8000/events/uploads",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(eventData),
          }
        );

        if (response.ok) {
          apiSuccess = true;
          const data = await response.json();

          // Also save to localStorage for immediate display
          const newEvent = {
            id: generateUniqueId(),
            title,
            category,
            location,
            image:
              base64File ||
              "https://via.placeholder.com/210x210/374151/FFFFFF?text=Event",
            date,
            time,
            description,
            // organizerName,
            contactInfo,
          };

          const existingEvents = JSON.parse(
            localStorage.getItem("createdEvents") || "[]"
          );
          const updatedEvents = [...existingEvents, newEvent];
          localStorage.setItem("createdEvents", JSON.stringify(updatedEvents));

          // Dispatch storage event to notify other components
          window.dispatchEvent(new Event("storage"));

          setSubmitStatus({
            type: "success",
            message: "Event created successfully!",
          });
        } else {
          const data = await response.json();
          throw new Error(data.message || "Failed to create event.");
        }
      } catch (apiError) {
        console.warn("API failed, saving to localStorage only:", apiError);

        // Fallback: Save to localStorage only
        const newEvent = {
          id: generateUniqueId(),
          title,
          category,
          location,
          image:
            base64File ||
            "https://via.placeholder.com/210x210/374151/FFFFFF?text=Event",
          date,
          time,
          description,
          // organizerName,
          contactInfo,
        };

        const existingEvents = JSON.parse(
          localStorage.getItem("createdEvents") || "[]"
        );
        const updatedEvents = [...existingEvents, newEvent];
        localStorage.setItem("createdEvents", JSON.stringify(updatedEvents));

        // Dispatch storage event to notify other components
        window.dispatchEvent(new Event("storage"));

        setSubmitStatus({
          type: "success",
          message: "Event created successfully! (Saved locally)",
        });
      }

      // Reset form after successful submission
      if (apiSuccess || true) {
        // Always true in fallback case
        setTitle("");
        setDescription("");
        setCategory("");
        setDate("");
        setTime("");
        setLocation("");
        setOrganizationName("");
        setContactInfo("");
        setFile(null);
        setPreview(null);
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to create event. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="text-white min-h-screen flex justify-center pt-34 py-10">
        <div className="w-full max-w-2xl space-y-6 px-10">
          <h1 className="text-3xl font-semibold mb-6 text-center">
            Create Event
          </h1>

          {/* Status Messages */}
          {submitStatus.type === "success" && (
            <div className="bg-green-800 text-green-200 p-3 rounded-md">
              {submitStatus.message}
            </div>
          )}

          {submitStatus.type === "error" && (
            <div className="bg-red-800 text-red-200 p-3 rounded-md">
              <p>{submitStatus.message}</p>
              {submitStatus.errors && (
                <ul className="mt-2 text-sm">
                  {submitStatus.errors.map((error, index) => (
                    <li key={index}>
                      • {error.field}: {error.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium">Event Title</label>
              <input
                type="text"
                placeholder="Enter event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-700 border border-gray-700 rounded-md p-2"
                required
                minLength={5}
                maxLength={100}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-24 bg-gray-700 border border-gray-700 rounded-md p-2 resize-none"
                required
                minLength={10}
                maxLength={1000}
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-700 border border-gray-700 rounded-md p-2"
                required
              >
                <option value="">Select category</option>
                <option value="Music">Music</option>
                <option value="Art">Art</option>
                <option value="Sports">Sports</option>
                <option value="Tech">Tech</option>
                <option value="Food">Food</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-700 rounded-md p-2"
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-700 rounded-md p-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-gray-700 border border-gray-700 rounded-md p-2"
                required
                minLength={5}
                maxLength={200}
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
                required
                minLength={2}
                maxLength={50}
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
                required
                minLength={5}
                maxLength={100}
              />
            </div>

            <div className="border border-dashed border-gray-600 bg-[#1e1f24] rounded-md p-6 text-center hover:border-blue-500 cursor-pointer">
              <p className="text-sm font-semibold text-white mb-1">
                Upload Event Image
              </p>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="mx-auto"
                required
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 mx-auto max-h-48 rounded-md"
                />
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-3 rounded-md font-medium transition-colors"
              >
                {isSubmitting ? "Creating Event..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
