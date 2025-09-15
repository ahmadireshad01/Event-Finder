import React, { useState } from "react";
// import ProfileEventCard from "../../components/ProfileEventCard";
import Profile from "../../components/Profile";
import { Link } from "react-router-dom";
import { savedEvents } from "../../data/saved-events-date";
import { pastEvents } from "../../data/past-events-date";
import Nav from "../../components/Nav";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"saved" | "past">("saved");
  const eventsToShow = activeTab === "saved" ? savedEvents : pastEvents;

  return (
    <>
      <Nav />
      {/* Navigation */}

      {/* Main Wrapper */}
      <div className="pt-24 flex flex-col items-center pb-12">
        {/* Profile Section */}
        <Profile />

        {/* Content Container */}
        <div className="mx-[10vw] flex flex-col items-center mt-6 max-w-[1600px] w-full">
          {/* Tabs */}
          <div className="border-b border-gray-700 flex items-center px-6 pb-3 gap-6 w-full">
            {["saved", "past"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "saved" | "past")}
                className={`pb-3 font-semibold transition-colors duration-200 ${
                  activeTab === tab
                    ? "border-b-2 border-white text-white text-[16px]"
                    : "text-gray-400 text-[13px] hover:text-gray-200"
                }`}
              >
                {tab === "saved" ? "Saved Events" : "Past Events"}
              </button>
            ))}
          </div>

          {/* Section Title */}
          <h2 className="p-4 text-[23px] font-semibold pl-6 self-start">
            {activeTab === "saved" ? "Saved Events" : "Past Events"}
          </h2>

          {/* Events List */}
          <div className="flex flex-col gap-4 w-full px-6">
            {eventsToShow.length > 0 ? (
              eventsToShow.map((theEvent) => (
                <Link
                  to={`/event/${theEvent.id}`}
                  key={theEvent.id}
                  className="block hover:scale-[1.01] transition-transform duration-150"
                ></Link>
              ))
            ) : (
              <p className="text-gray-400 text-center py-6">
                No events found in this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
