import { useState, useEffect } from "react";

interface EventCardProps {
  id: string;
  title: string;
  location: string;
  category?: string;
  image: string;
  date?: string;
  organizerName?: string;
  isLoggedIn: boolean;
}

export default function EventCard({
  id,
  title,
  location,
  image,
  date,
  organizerName,
  isLoggedIn,
}: EventCardProps) {
  const [joined, setJoined] = useState(false);

  // Check join status on mount
  useEffect(() => {
    const joinedStatus = localStorage.getItem(`joined-${id}`) === "true";
    setJoined(joinedStatus);
  }, [id]);

  const handleJoin = () => {
    if (!isLoggedIn) {
      alert("You must be logged in to join this event");
      return;
    }
    localStorage.setItem(`joined-${id}`, "true");
    setJoined(true);
  };

  return (
    <div className="rounded-lg transition duration-300 bg-slate-800 text-white flex flex-col items-center p-4">
      {/* Image */}
      <div className="w-[220px] h-[140px] overflow-hidden rounded-xl mb-3">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex flex-col items-center justify-center text-center">
        <p className="font-semibold text-lg">{title}</p>
        {organizerName && (
          <p className="text-sm text-gray-300">By {organizerName}</p>
        )}
        {date && <p className="text-sm text-gray-400">📅 {date}</p>}
        <p className="font-medium text-sm text-gray-200">{location}</p>

        {/* Join button */}
        <button
          onClick={handleJoin}
          disabled={joined || !isLoggedIn}
          className={`mt-4 px-4 py-2 rounded-lg transition text-sm font-semibold ${
            joined
              ? "bg-green-500 cursor-default"
              : isLoggedIn
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          {joined ? "Joined" : "Join"}
        </button>
      </div>
    </div>
  );
}
