import { useParams } from "react-router-dom";
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
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <p>❌ Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
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
    </div>
  );
}
