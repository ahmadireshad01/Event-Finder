import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import Pagination from "./Pagination";

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
  organizerName?: string;
}

export default function PopularEvents({ searchQuery }: PopularEventsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    const storedEvents: Event[] = JSON.parse(
      localStorage.getItem("createdEvents") || "[]"
    );

    // ✅ filter out expired events
    const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD
    const validEvents = storedEvents.filter(
      (event) => !event.date || event.date >= today
    );

    setAllEvents(validEvents);
  }, []);

  // ✅ filtering by search & category
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

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(
    startIndex,
    startIndex + eventsPerPage
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const defaultCategories = [
    "Music",
    "Art",
    "Sports",
    "Tech",
    "Food",
    "Education",
  ];
  const uniqueCategories = Array.from(
    new Set(allEvents.map((e) => e.category))
  ).filter((cat) => cat && cat.trim() !== "");
  const allCategories = [
    "All",
    ...Array.from(new Set([...defaultCategories, ...uniqueCategories])),
  ];

  return (
    <div className="flex flex-col mt-8 w-full px-[5%] lg:px-[130px] pt-6">
      {/* Categories */}
      <div className="flex justify-between items-center mb-6">
        <p className="font-bold text-3xl text-white">Popular Categories</p>
        {selectedCategory !== "All" && (
          <span className="text-gray-400">
            {filteredEvents.length} event
            {filteredEvents.length !== 1 ? "s" : ""} found
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-3 py-4 overflow-x-auto pb-2 custom-scrollbar">
        {allCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-5 py-2 rounded-full transition-all duration-200 flex-shrink-0 ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Trending Events */}
      <div className="flex justify-between items-center mt-8 mb-4">
        <p className="font-bold text-2xl text-white">Trending Events</p>
        {filteredEvents.length > 0 && (
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages} ({filteredEvents.length} events)
          </span>
        )}
      </div>

      {/* Event Grid */}
      {currentEvents.length > 0 ? (
        <div className="w-full grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {currentEvents.map((theEvent) => (
            <Link to={`/event/${theEvent.id}`} key={theEvent.id}>
              <EventCard
                id={theEvent.id}
                title={theEvent.title}
                category={theEvent.category}
                location={theEvent.location}
                image={theEvent.image}
                date={theEvent.date}
                organizerName={theEvent.organizerName}
                isLoggedIn={isLoggedIn}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-400 text-xl mb-2">No events found</p>
          <p className="text-gray-500">
            Try selecting a different category or adjusting your search
          </p>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          if (filteredEvents.length > eventsPerPage) {
            setCurrentPage(page);
          }
        }}
      />
    </div>
  );
}
