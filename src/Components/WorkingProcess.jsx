import React from "react";
import {
  UserPlusIcon,
  ClipboardDocumentCheckIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    title: "1. Register & Set Up",
    desc: "HR Managers create an account, set up company details, and start adding assets.",
    icon: <UserPlusIcon className="w-12 h-12 text-emerald-600" />,
  },
  {
    title: "2. Request & Approve",
    desc: "Employees request assets, and HR approves or assigns assets directly in one click.",
    icon: <ClipboardDocumentCheckIcon className="w-12 h-12 text-emerald-600" />,
  },
  {
    title: "3. Track Everything",
    desc: "Monitor inventory, employee usage, and analytics with a clean and intuitive dashboard.",
    icon: <ComputerDesktopIcon className="w-12 h-12 text-emerald-600" />,
  },
];

const WorkingProcess = () => {
  return (
    <section className="px-6 py-16 w-full md:w-[90%] lg:w-[80%] mx-auto my-8 mt-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            How AssetVerse Works
          </h2>
          <p className="opacity-70 mt-3 max-w-xl mx-auto">
            A simple, streamlined 3-step workflow that makes asset management effortless.
          </p>
        </div>

        {/* 3-STEP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-base-200 rounded-2xl p-8 shadow-sm border border-base-300 hover:shadow-md transition text-center"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>

              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>

              <p className="opacity-70 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WorkingProcess;
