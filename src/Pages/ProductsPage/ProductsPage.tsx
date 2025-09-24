import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://172.30.10.42:8000/events");
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        const data: Event[] = await res.json();
        setAllEvents(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = allEvents.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch =
      event.title.includes(searchQuery.toLowerCase()) ||
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

  const loadMore = () => {
    setVisibleCount((current) => Math.min(current + 10, filteredEvents.length));
  };

  const showLess = () => {
    setVisibleCount((current) => Math.max(10, current - 10));
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
    <div className="flex flex-col mt-8 w-full px-[5%] lg:px-[130px] pt-6 ">
      <div className="flex justify-between items-center mb-6">
        <p className="font-bold text-3xl text-white">Popular Categories</p>
        {selectedCategory !== "All" && (
          <span className="text-gray-400">
            {filteredEvents.length} event
            {filteredEvents.length !== 1 ? "s" : ""} found
          </span>
        )}
      </div>

      {/* Category Buttons */}
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

      <div className="flex justify-between items-center mt-8 mb-4">
        <p className="font-bold text-2xl text-white">Trending Events</p>
        {filteredEvents.length > 0 && (
          <span className="text-sm text-gray-400">
            Showing {Math.min(visibleCount, filteredEvents.length)} of{" "}
            {filteredEvents.length} events
          </span>
        )}
      </div>

      {/* Loading & Error Handling */}
      {loading && (
        <div className="text-gray-400 text-center py-10">Loading events...</div>
      )}
      {error && (
        <div className="text-red-400 text-center py-10">
          Failed to load events: {error}
        </div>
      )}

      {!loading && !error && visibleEvents.length > 0 ? (
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
                  image={theEvent.image}
                />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-400 text-xl mb-2">No events found</p>
            <p className="text-gray-500">
              Try selecting a different category or adjusting your search
            </p>
          </div>
        )
      )}

      {/* Load More / Show Less */}
      {visibleEvents.length > 0 && filteredEvents.length > 10 && (
          <div className="flex gap-4 mt-8 justify-center w-full">
            {visibleCount < filteredEvents.length && (
              <button
                className="bg-blue-500 w-32 h-9 rounded-lg btn-hover"
                onClick={loadMore}
              >
                Load More
              </button>
            )}

            {visibleCount > 10 && (
              <button
                className="bg-blue-500 w-32 h-9 rounded-lg btn-hover"
                onClick={showLess}
              >
                Show Less
              </button>
            )}
          </div>
        )}
    </div>
  );
}
