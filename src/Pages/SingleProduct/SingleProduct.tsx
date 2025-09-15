import React from "react";
import LineUp from "../../components/LineUp";
import { eventData } from "../../data/event-data";
import { useParams } from "react-router-dom";
import Nav from "../../components/Nav";

const SingleEventPage = () => {
  const { id } = useParams();

  const event = eventData.find((event) => event.id === id);

  if (!event) {
    return <p className="text-white text-center pt-20">Loading...</p>;
  }

  return (
    <>
      <Nav />
      <div className="flex-col flex items-center pt-28 justify-center pb-7">
        <img className="w-[76vw] max-w-[800px]" src={event.image} alt="Event" />

        <div className="flex flex-col items-start w-[76vw] max-w-[800px] gap-2">
          <p className="text-2xl font-semibold pt-3">{event.title}</p>
          <p className="text-gray-500 text-[12px]">{event.description}</p>
          <p className="text-gray-500 text-[12px]">
            {event.date.toLocaleDateString()}
          </p>
          <p className="text-gray-500 text-[12px]">{event.time}</p>
          <p className="text-gray-500 text-[12px]">{event.location}</p>
          <p className="text-[12px] font-light">{event.details}</p>
        </div>

        <div className="w-[76vw] max-w-[800px] pt-6 flex flex-col items-start">
          <p className="font-semibold">LineUp</p>
          {event.lineUp.map((act) => (
            <LineUp key={act.id} {...act} />
          ))}
        </div>

        <div className="pt-3.5">
          <p className="font-semibold pb-2">Location</p>
          <img
            className="w-[76vw] max-w-[800px]"
            src={event.locationImage}
            alt="Location"
          />

          <button className="w-29 h-9 rounded-lg font-semibold mt-4 bg-blue-500 px-4 py-2">
            Buy Tickets
          </button>

          <div className="flex flex-row items-center pl-5 gap-6 pt-5">
            <div className="flex flex-col items-center gap-1">
              <button className="bg-gray-700 w-8 h-8 p-2 rounded-2xl">
                <img
                  src="/images/singleProductImg/shareImage.svg"
                  alt="Share"
                />
              </button>
              <p>Share</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button className="bg-gray-700 w-8 h-8 p-2 pl-2.5 rounded-2xl">
                <img src="/images/singleProductImg/bookmarkImage.svg" />
              </button>
              <p>Bookmark</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleEventPage;
