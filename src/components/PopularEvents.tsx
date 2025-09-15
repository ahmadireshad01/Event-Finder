import React, { useState } from "react";
import { Link } from "react-router-dom";
import { upComimgEvents } from "../data/upcoming-events";
import EventCard from "./EventCard";

interface PopularEventsProps {
  searchQuery: string;
}

export default function PopularEvents({ searchQuery }: PopularEventsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);

  const filteredEvents = upComimgEvents.filter((event) => {
    const query = searchQuery.toLowerCase();

    const matchesCategory = selectedCategory
      ? event.catagory.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    const matchesSearch =
      event.title.toLowerCase().includes(query) ||
      event.catagory.toLowerCase().includes(query) ||
      (event.location && event.location.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const visibleEvents = filteredEvents.slice(0, visibleCount);

  const loadMore = () => {
    if (visibleCount < filteredEvents.length) {
      setVisibleCount((prev) => prev + 10);
    }
  };

  const showLess = () => setVisibleCount(10);

  const handleCategoryClick = (category: string) => {
    if (category === "All") setSelectedCategory(null);
    else setSelectedCategory(category);

    setVisibleCount(10);
  };

  return (
    <div className="flex flex-col mt-8 w-full px-[130px] pt-6">
      <p className="font-semibold max-md:pl-7 text-3xl text-white">
        Popular Categories
      </p>

      <div className="flex gap-2 py-7 max-md:flex-wrap max-md:pl-7 max-lg:pl-7">
        {["All", "Music", "Art", "Sports", "Tech", "Food", "Education"].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`catagories-btn-hover px-4 h-9 rounded-xl transition ${
                selectedCategory === cat || (cat === "All" && !selectedCategory)
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

      <div className="w-full grid grid-cols-5 gap-4 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
        {visibleEvents.map((theEvent, index) => {
          const cardStyles = [
            "bg-slate-800 border border-slate-600",
            "bg-slate-800 border border-slate-600",
            "bg-slate-800 border border-slate-600",
          ];
          const selectedStyle = cardStyles[index % cardStyles.length];

          return (
            <Link to={`/event/${theEvent.id}`} key={theEvent.id}>
              <div
                className={`rounded-xl transition shadow-none ${selectedStyle} flex flex-col justify-center items-center`}
                style={{ height: "210px", width: "210px" }}
              >
                <EventCard
                  title={theEvent.title}
                  id={theEvent.id}
                  catagory={theEvent.catagory}
                  location={theEvent.location}
                  image={theEvent.image}
                />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex gap-4 mt-8 justify-center">
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
  );
}
