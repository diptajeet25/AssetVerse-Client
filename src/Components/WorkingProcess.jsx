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
    <section className="bg-slate-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            How AssetVerse Works
          </h2>
          <p className="text-slate-600 mt-3 max-w-xl mx-auto">
            A simple, streamlined 3-step workflow that makes asset management effortless.
          </p>
        </div>

        {/* 3-STEP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition text-center"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>

              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {step.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
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
