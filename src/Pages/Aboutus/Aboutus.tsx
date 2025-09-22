import React from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

export default function AboutUs() {
  return (
    <div className=" bg-slate-900">
      <Nav />
      <div className=" text-gray-800 mt-12">
        {/* Header Section */}
        <section className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="pb-5  text-white font-semibold text-2xl uppercase">
            About Us
          </p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold mt-2">
            Connecting Communities, Discovering <br /> Local Events
          </h1>
          <p className="mt-4 py-4  text-white">
            Local Event Finder is your go-to platform for discovering local
            happenings, connecting with people in your area, and experiencing
            everything your community has to offer. Our mission is to bring
            people closer together through shared events and meaningful
            experiences.
          </p>
        </section>

        {/* Mission / Vision / Values */}
        <section className=" py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            <div className="p-6 border rounded-lg shadow-sm text-center bg-slate-800">
              <h3 className="font-bold text-lg text-white">Our Mission</h3>
              <p className="text-center text-white ">
                To empower communities by helping people find, attend, and enjoy
                local events that inspire connection and engagement.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm text-center bg-slate-800">
              <h3 className="font-bold text-lg text-white">Our Vision</h3>
              <p className="text-center text-white">
                To become the leading local events discovery platform, where
                individuals can easily explore and connect through diverse
                gatherings and experiences.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-sm text-center bg-slate-800">
              <h3 className="font-bold text-lg text-white">Our Values</h3>
              <p className="text-center text-white">
                We believe in inclusivity, community, and accessibility. We
                strive to create a welcoming environment where everyone can find
                something they love to attend.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16  text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Meet Our Team</h2>
          <p className="text-white mb-12">
            The passionate individuals behind Local Event Finder.
          </p>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6">
            {/* Example team members */}
            <div>
              <img
                src="../../../public/images/aboutus/image1.svg"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full object-cover shadow-md"
              />
              <h3 className="mt-4 font-semibold text-white">Alex Johnson</h3>
              <p className="text-sm text-gray-500">Founder & CEO</p>
            </div>

            <div>
              <img
                src="../../../public/images/aboutus/image2.svg"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full object-cover shadow-md"
              />
              <h3 className="mt-4 font-semibold text-white">Sarah Lee</h3>
              <p className="text-sm text-gray-500">Head of Marketing</p>
            </div>

            <div>
              <img
                src="../../../public/images/aboutus/image3.svg"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full object-cover shadow-md"
              />
              <h3 className="mt-4 font-semibold text-white">David Kim</h3>
              <p className="text-sm text-gray-500">Head of Engineering</p>
            </div>

            <div>
              <img
                src="../../../public/images/aboutus/image4.svg"
                alt="Team Member"
                className="w-32 h-32 mx-auto rounded-full object-cover shadow-md"
              />
              <h3 className="mt-4 font-semibold text-white">Emily Brown</h3>
              <p className="text-sm text-gray-500">Community Manager</p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className=" py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Our Story</h2>
            <p className="text-white leading-relaxed">
              Local Event Finder was founded in 2023 with the mission to
              simplify event discovery for everyone. Recognizing the need for a
              platform where communities can easily connect, we built Local
              Event Finder to make local experiences accessible to all. From
              concerts and festivals to workshops and networking events, we aim
              to bring communities together one event at a time.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
