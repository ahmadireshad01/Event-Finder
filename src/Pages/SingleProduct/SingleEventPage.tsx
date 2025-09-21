import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  date?: string;
  time?: string;
  description?: string;
  organizerName?: string;
  contactInfo?: string;
}

export default function SingleEventPage() {
  const { id } = useParams();
  const navigate = useNavigate(); // For navigation
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const storedEvents: Event[] = JSON.parse(
      localStorage.getItem("createdEvents") || "[]"
    );
    const foundEvent = storedEvents.find((ev) => ev.id === id);
    setEvent(foundEvent || null);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900">
        <p>❌ Event not found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 gap-6">
      <div className="bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col items-center gap-4">
        <img
          src={event.image}
          alt={event.title}
          className="w-[300px] h-[400px] object-cover rounded-lg"
        />

        <h1 className="text-3xl font-bold">{event.title}</h1>
        <p className="text-gray-400">
          <strong>Category:</strong> {event.category}
        </p>
        <p className="text-gray-400">
          <strong>Location:</strong> {event.location}
        </p>
        {event.date && (
          <p className="text-gray-400">
            <strong>Date:</strong> {event.date} {event.time || ""}
          </p>
        )}
        {event.description && (
          <p className="mt-2 text-gray-300 text-center">{event.description}</p>
        )}
        {event.organizerName && (
          <p className="text-gray-400">
            <strong>Organizer:</strong> {event.organizerName}
          </p>
        )}
        {event.contactInfo && (
          <p className="text-gray-400">
            <strong>Contact:</strong> {event.contactInfo}
          </p>
        )}
      </div>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
      >
        Back to Home
      </button>
    </div>
  );
}
