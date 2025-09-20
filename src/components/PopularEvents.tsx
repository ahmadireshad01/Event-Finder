import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { upComimgEvents } from "../data/upcoming-events";
import EventCard from "./EventCard";

interface PopularEventsProps {
  searchQuery: string;
}

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

export default function PopularEvents({ searchQuery }: PopularEventsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(10);
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  // Load events from localStorage + default events
  useEffect(() => {
    const storedEvents: Event[] = JSON.parse(
      localStorage.getItem("createdEvents") || "[]"
    );
    setAllEvents([...storedEvents, ...upComimgEvents]);
  }, []);

  // Filter events based on category and search
  const filteredEvents = allEvents.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.location &&
        event.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const visibleEvents = filteredEvents.slice(0, visibleCount);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(10);
  };

  return (
    <div className="flex flex-col mt-8 w-full px-[130px] pt-6 max-md:px-7 max-lg:px-7">
      <p className="font-semibold text-3xl text-white">Popular Categories</p>

      <div className="flex gap-2 py-7 max-md:flex-wrap">
        {["All", "Music", "Art", "Sports", "Tech", "Food", "Education"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`catagories-btn-hover px-4 h-9 rounded-xl transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      <p className="font-semibold pb-3 text-2xl text-white">Trending Events</p>

      {visibleEvents.length > 0 ? (
        <div className="w-full grid grid-cols-5 gap-4 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
          {visibleEvents.map((theEvent, index) => (
            <Link to={`/event/${theEvent.id}`} key={theEvent.id}>
              <div
                className="rounded-xl transition shadow-none bg-slate-800 border border-slate-600 flex flex-col justify-center items-center text-white"
                style={{ height: "210px", width: "210px" }}
              >
                <EventCard
                  title={theEvent.title}
                  id={theEvent.id}
                  catagory={theEvent.category}
                  location={theEvent.location}
                  image={theEvent.image}
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 py-6">No events found for this category.</p>
      )}

      <div className="flex gap-4 mt-8 justify-center">
        {visibleCount < filteredEvents.length && (
          <button
            className="bg-blue-500 w-32 h-9 rounded-lg btn-hover"
            onClick={() => setVisibleCount((prev) => prev + 10)}
          >
            Load More
          </button>
        )}
        {visibleCount > 10 && (
          <button
            className="bg-blue-500 w-32 h-9 rounded-lg btn-hover"
            onClick={() => setVisibleCount(10)}
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
}
