import React from "react";

const testimonials = [
  {
    name: "Apex Technologies",
    feedback:
      "AssetVerse transformed the way our HR team manages devices. Faster approvals and complete visibility!",
    person: "Sarah Malik, HR Manager",
  },
  {
    name: "TechNova Solutions",
    feedback:
      "We reduced asset loss by 40% after switching to AssetVerse. The system is clean, fast, and easy to use.",
    person: "Arif Chowdhury, Operations Lead",
  },
  {
    name: "BlueWave Digital",
    feedback:
      "Managing 150+ employee assets was a nightmare before. AssetVerse made everything so smooth!",
    person: "Maya Fernandes, Senior HR",
  },
];

const TestimonialsSection = () => {
  return (
    <section className=" px-6 py-16 w-full md:w-[90%] lg:w-[80%] mx-auto my-8 mt-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            Trusted by Modern Teams
          </h2>
          <p className="opacity-70 mt-3 max-w-2xl mx-auto">
            Companies around the world rely on AssetVerse to track devices, streamline workflow,  
            and improve HR management efficiency.
          </p>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <Stat number="100+" label="Companies Trust Us" />
          <Stat number="1,200+" label="Assets Managed Daily" />
          <Stat number="98%" label="HR Satisfaction Rate" />
        </div>

        {/* TESTIMONIAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-base-200 p-6 rounded-2xl shadow-sm border border-base-300 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {item.name}
              </h3>

              <p className="opacity-70 text-sm leading-relaxed mb-4">
                "{item.feedback}"
              </p>

              <p className="text-sm font-medium">{item.person}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

const Stat = ({ number, label }) => (
  <div className="text-center bg-base-100 rounded-2xl py-6 shadow-sm border border-base-300">
    <h3 className="text-3xl md:text-4xl font-bold text-emerald-600">{number}</h3>
    <p className="opacity-70 mt-1 text-sm">{label}</p>
  </div>
);

export default TestimonialsSection;
