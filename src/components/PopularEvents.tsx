// PopularEvents.tsx
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
  myFile: string; // Base64 string or URL from backend
  date?: string;
  organizerName?: string;
}

export default function PopularEvents({ searchQuery }: PopularEventsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const eventsPerPage = 10;

  // ✅ fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://172.30.10.42:8000/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data: Event[] = await res.json();
        setAllEvents(data);
      } catch (err: any) {
        setError(err.message || "Error fetching events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // ✅ filtering by search & category
  const filteredEvents = allEvents.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      (event.title && event.title.toLowerCase().includes(searchLower)) ||
      (event.category && event.category.toLowerCase().includes(searchLower)) ||
      (event.location && event.location.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(
    startIndex,
    startIndex + eventsPerPage
  );

  const visibleEvents = currentEvents;
  const visibleCount = visibleEvents.length;

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const defaultCategories = ["Music", "Art", "Sports", "Tech", "Food", "Education"];
  const uniqueCategories = Array.from(
    new Set(allEvents.map((e) => e.category))
  ).filter((cat) => cat && cat.trim() !== "");
  const allCategories = ["All", ...Array.from(new Set([...defaultCategories, ...uniqueCategories]))];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-300">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20 text-red-400">
        {error}
      </div>
    );
  }

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
            Showing {Math.min(visibleCount, filteredEvents.length)} of{" "}
            {filteredEvents.length} events
          </span>
        )}
      </div>

      {visibleEvents.length > 0 ? (
        <div
          className="w-full grid gap-6 
          grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
          justify-start"
        >
          {visibleEvents.map((theEvent) => (
            <Link to={`/event/${theEvent.id}`} key={theEvent.id}>
              <div
                className="rounded-xl transition shadow-none bg-slate-800 border border-slate-600 
                overflow-hidden h-[280px] w-full text-white flex flex-col items-center justify-center"
              >
                <EventCard
                  title={theEvent.title}
                  id={theEvent.id}
                  category={theEvent.category}
                  location={theEvent.location}
                  image={theEvent.myFile}
                  date={theEvent.date}
                  organizerName={theEvent.organizerName}
                />
              </div>
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
        onPageChange={(page: number) => {
          if (filteredEvents.length > eventsPerPage) {
            setCurrentPage(page);
          }
        }}
      />
    </div>
  );
}

