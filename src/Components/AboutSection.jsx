import React from "react";
import {
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const benefits = [
  {
    title: "Efficient Asset Tracking",
    desc: "Monitor laptops, devices, and all company equipment in real-time.",
    icon: <ClipboardDocumentCheckIcon className="w-10 h-10 text-emerald-600" />,
  },
  {
    title: "HR-Centric Workflow",
    desc: "Simplifies asset assignment, approvals, and employee management.",
    icon: <UserGroupIcon className="w-10 h-10 text-emerald-600" />,
  },
  {
    title: "Data-Driven Insights",
    desc: "HR managers get analytics for better decision-making and planning.",
    icon: <ChartBarIcon className="w-10 h-10 text-emerald-600" />,
  },
  {
    title: "Secure & Reliable",
    desc: "Role-based access, JWT security, and safe asset handling.",
    icon: <ShieldCheckIcon className="w-10 h-10 text-emerald-600" />,
  },
];

const AboutSection = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">

       
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Why Choose AssetVerse?
          </h2>
          <p className="text-slate-600 mt-3 max-w-2xl mx-auto">
            A modern asset management solution designed to streamline HR tasks
            and improve company efficiency with powerful, yet simple tools.
          </p>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-slate-100"
            >
              <div className="mb-4">{item.icon}</div>

              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
