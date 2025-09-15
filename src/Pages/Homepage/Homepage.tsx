import React, { useState } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PopularEvents from "../../components/PopularEvents";
import Carts from "../../components/Carts";

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchHandle = (e: any) => {
    e.preventDefault();
    console.log("Search submitted:", searchQuery);
  };

  return (
    <>
      <Nav />
      <div className="items-center flex flex-col">
        {/* top of the page */}
        <div className="relative mt-32 w-full px-4">
          {/* Background Image */}
          <img
            src="/images/homeImg/homePageImg1.png"
            alt="Event background"
            className="w-full max-w-7xl mx-auto rounded-2xl object-cover h-[300px] sm:h-[400px] md:h-[500px] lg:h-[640px]"
          />

          {/* Text + Search Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="font-bold font-sans text-3xl sm:text-4xl md:text-5xl max-w-2xl">
              Discover Events Near You
            </h1>
            <p className="mt-4 font-normal text-sm sm:text-base">
              Find local events, concerts, exhibitions, and more in your area.
            </p>

            {/* Search Bar */}
            <div className="relative mt-6 w-full max-w-xl">
              <img
                src="/images/homeImg/searchIcon.svg"
                alt="Search Icon"
                className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5"
              />
              <input
                type="text"
                placeholder="Search for events"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-32 py-4 w-full bg-gray-900 rounded-2xl text-white transition duration-200 ease-in-out"
              />
              <button
                onClick={searchHandle}
                type="submit"
                className="btn-hover absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-500 text-white px-5 py-2 rounded-xl font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* middle of the page */}
        <div>
          {/* Pass searchQuery down to PopularEvents */}
          <PopularEvents searchQuery={searchQuery} />
        </div>

        <div>
          <Carts />
        </div>

        {/* footer */}
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
