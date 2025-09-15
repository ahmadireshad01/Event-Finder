import React from "react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    avatar: "https://i.pravatar.cc/50?img=1",
    message:
      "Evently has been a game-changer for my career. I've discovered amazing conferences and workshops I wouldn't have found otherwise.",
  },
  {
    name: "David Chen",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/50?img=2",
    message:
      "The platform is incredibly user-friendly and the quality of events is top-notch. Highly recommended for any professional.",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder & CEO",
    avatar: "https://i.pravatar.cc/50?img=3",
    message:
      "A fantastic resource for networking and professional development. I've made invaluable connections through events I found on Evently.",
  },
];

export default function Carts() {
  return (
    <div>
      <section className="py-16 px-11 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-800 p-6 rounded-xl shadow-lg flex flex-col items-start"
              >
                <p className="mb-4 text-sm">{`"${testimonial.message}"`}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
