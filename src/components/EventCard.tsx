import { useState, useEffect } from "react";

interface EventCardProps {
  id: string;
  title: string;
  location: string;
  category?: string;
  image: string;
}

export default function EventCard({
  id,
  title,
  location,
  image,
}: EventCardProps) {
  const [joined, setJoined] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login and join status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

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
    <div className="rounded-lg transition duration-300 cursor-pointer bg-slate-800 text-white flex flex-col items-center ">
      <div className="w-[220px] h-[140px] overflow-hidden rounded-xl mb-3">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className=" flex flex-col items-center justify-center">
        <div className="mt-2">
          <p className=" font-semibold text-[20px]">{title}</p>
          <p className="font-semibold  text-[14px]">{location}</p>
        </div>

        <button
          onClick={handleJoin}
          className={` mt-4 text-[16px] px-2 text-center rounded-lg transition ${
            joined
              ? "bg-green-500 cursor-default"
              : isLoggedIn
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
          disabled={joined || !isLoggedIn}
        >
          {joined ? " Joined" : "Join"}
        </button>
      </div>
    </div>
  );
}
