import { useState } from "react";
import EventCard from "../../components/EventCard";
import { eventData } from "../../data/event-data";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isCatagoryOpen, setIsCatagoryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Filtering events
  const filteredEvents = eventData.filter((event) => {
    const matchesCategory = selectedCategory
      ? event.catagory.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const matchesSearch =
      event.catagory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.date
        .toDateString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const visibleEvents = filteredEvents.slice(0, visibleCount);

  const loadMore = () => setVisibleCount((prev) => prev + 10);

  const showLess = () => {
    if (visibleCount > 10) {
      setVisibleCount((prev) => prev - 10);
    } else {
      setVisibleCount(10);
    }
  };

  const handleCategoryClick = (category: string) => {
    if (category === "All") {
      setSelectedCategory(null); // reset filter
    } else {
      setSelectedCategory(category);
    }
    setIsCatagoryOpen(false);
  };

  return (
    <div>
      <Nav />
      <div className="pt-32 flex flex-col items-start mx-28 max-sm:mx-2 xl:mx-48">
        {/* Search Bar */}
        <div className="relative w-[80vw]">
          <img
            className="absolute top-3 left-5"
            src="./public/images/homeImg/searchIcon.svg"
            alt="search"
          />
          <input
            className="ml-2 w-[74vw] bg-gray-800 h-11 rounded-lg pl-10 text-white"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by keyword, category, date, and location"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-row pt-4 gap-4 pb-4 pl-3">
          {/* Category */}
          <div className="relative">
            <button
              onClick={() => setIsCatagoryOpen(!isCatagoryOpen)}
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
            {isCatagoryOpen && (
              <ul className="absolute z-10 mt-1 w-fit bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                {["All", "Music", "Food", "Art", "Education", "Tech"].map(
                  (cat) => (
                    <li
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                    >
                      {cat}
                    </li>
                  )
                )}
              </ul>
            )}
          </div>

          {/* Location */}
          <div className="relative">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Location
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
            {isLocationOpen && (
              <ul className="absolute z-10 mt-1 w-fit bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                {["London", "New York", "Tokyo"].map((loc) => (
                  <li
                    key={loc}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                  >
                    {loc}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Event Grid */}
        <div className="w-full mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visibleEvents.map((theEvent, index) => {
            // cycle different bg colors
            const colors = [
              "bg-gray-800",
              "bg-gray-800",
              "bg-gray-800",
              "bg-gray-800",
              "bg-gray-800",
              "bg-gray-800",
            ];
            const cardBg = colors[index % colors.length];

            return (
              <Link
                key={theEvent.id}
                to={`/event/${theEvent.id}`}
                className={`block ${cardBg} rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300`}
              >
                <EventCard
                  title={theEvent.title}
                  id={theEvent.id}
                  catagory={theEvent.catagory}
                  location={theEvent.location}
                  image={theEvent.image}
                />
              </Link>
            );
          })}
        </div>

        {/* Buttons - centered */}
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
      </div>
    </div>
  );
}
