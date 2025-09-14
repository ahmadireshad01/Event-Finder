import { type JSX } from "react";

interface Event {
  image: string;
  title: string;
  date: string;
  id: number;
  description: string;
}

interface ProfileEventCardProps {
  event: Event;
}

export default function ProfileEventCard({
  event,
}: ProfileEventCardProps): JSX.Element {
  return (
    <div className=" mb-2 rounded-2xl h-auto flex pl-7 justify-between hover:bg-gray-700 delay-100 transition ease-in-out">
      <div className="flex-col pt-4 w-[76vw]">
        {/* date */}
        <p className="text-gray-400 text-[14px]">{event.date}</p>
        {/* title */}
        <p className=" font-semibold">{event.title}</p>
        {/* description */}
        <p className="text-gray-400 text-[14px]">{event.description}</p>
        <button className="bg-gray-700 w-28 h-9 font-semibold rounded-2xl mt-7 hover:bg-gray-800 transition ease-in-out">
          View Event
        </button>
      </div>
      <div className=" rounded-lg h-[190px] w-[500px] flex justify-center items-center">
        <img
          className="w-[16vw] h-auto min-w-[120px]"
          src={event.image}
          alt=""
        />
      </div>
    </div>
  );
}
