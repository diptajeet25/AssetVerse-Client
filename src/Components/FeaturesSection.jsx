import React from "react";
import {
  ComputerDesktopIcon,
  ClipboardDocumentListIcon,
  ArrowPathIcon,
  UserCircleIcon,
  ChartPieIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Centralized Asset Control",
    desc: "Manage all company devices and equipment from a unified, easy-to-use dashboard.",
    icon: <ComputerDesktopIcon className="w-10 h-10 text-emerald-600" />,
  },
  {
    title: "Smart Request System",
    desc: "Employees request assets; HR approves with a single click—no paperwork needed.",
    icon: <ClipboardDocumentListIcon className="w-10 h-10 text-emerald-600" />,
  },
  {
    title: "Automated Assignment",
    desc: "Auto-create employee affiliations and assign assets instantly upon approval.",
    icon: <ArrowPathIcon className="w-10 h-10 text-emerald-600" />,
  },
  {
    title: "Employee Insights",
    desc: "View employee asset history, team members, and upcoming birthdays.",
    icon: <UserCircleIcon className="w-10 h-10 text-emerald-600" />,
  },
  {
    title: "Real-Time Analytics",
    desc: "HR managers get charts & insights to monitor asset usage and trends.",
    icon: <ChartPieIcon className="w-10 h-10 text-emerald-600" />,
  },
  {
    title: "Secure Role-Based Access",
    desc: "HR and Employee dashboards have separate permissions secured by JWT.",
    icon: <LockClosedIcon className="w-10 h-10 text-emerald-600" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-base-100 px-6 py-16 w-full md:w-[90%] lg:w-[80%] mx-auto my-8 mt-8">
      <div className="max-w-7xl mx-auto">

       
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            Powerful Features to Boost Your Workflow
          </h2>
          <p className="opacity-70 mt-3 max-w-2xl mx-auto">
            AssetVerse provides the tools your team needs to manage assets efficiently
            and maintain full organizational visibility.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <div
              key={i}
              className="bg-base-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-base-300"
            >
              <div className="mb-4">{item.icon}</div>

              <h3 className="text-xl font-semibold mb-2">
                {item.title}
              </h3>

              <p className="opacity-70 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
