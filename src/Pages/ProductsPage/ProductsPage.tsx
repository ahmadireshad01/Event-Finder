import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard";
import Nav from "../../components/Nav";

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

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(10);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Load events from localStorage
  useEffect(() => {
    const storedEvents: Event[] = JSON.parse(
      localStorage.getItem("createdEvents") || "[]"
    );
    setAllEvents(storedEvents);
  }, []);

  // Filter events
  const filteredEvents = allEvents.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;

    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.location &&
        event.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.date &&
        event.date.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const visibleEvents = filteredEvents.slice(0, visibleCount);

  const loadMore = () => setVisibleCount((prev) => prev + 10);
  const showLess = () => setVisibleCount(10);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(10);
    setIsCategoryOpen(false);
  };

  // Categories from events
  const defaultCategories = [
    "All",
    "Music",
    "Food",
    "Art",
    "Education",
    "Tech",
  ];
  const uniqueCategories = Array.from(
    new Set(allEvents.map((e) => e.category))
  ).filter((cat) => cat && cat.trim() !== "");
  const allCategories = Array.from(
    new Set([...defaultCategories, ...uniqueCategories])
  );

  return (
    <div>
      <Nav />
      <div className="pt-32 flex flex-col items-start mx-28 max-sm:mx-2 xl:mx-48">
        {/* Search Bar */}
        <div className="relative w-[80vw]">
          <input
            className="ml-2 w-[74vw] bg-gray-800 h-11 rounded-lg pl-4 text-white"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by keyword, category, date, or location"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-row pt-4 gap-4 pb-4 pl-3">
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Category
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isCategoryOpen && (
              <ul className="absolute z-10 mt-1 text-white w-fit bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                {allCategories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700 flex items-center gap-2"
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Event Grid */}
        {visibleEvents.length > 0 ? (
          <div className="w-full mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleEvents.map((theEvent) => (
              <Link
                key={theEvent.id}
                to={`/event/${theEvent.id}`}
                className="block bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <EventCard
                  title={theEvent.title}
                  id={theEvent.id}
                  category={theEvent.category}
                  location={theEvent.location}
                  image={theEvent.image}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center w-full">
            <div className="text-5xl mb-4">😢</div>
            <p className="text-gray-400 text-xl mb-2">
              No events found for this category
            </p>
            <p className="text-gray-500">
              Try selecting a different category or adjusting your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
