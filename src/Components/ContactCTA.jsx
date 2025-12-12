import React from "react";

const ContactCTA = () => {
  return (
    <section className="bg-emerald-600 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Ready to Simplify Your Asset Management?
        </h2>

        <p className="text-emerald-100 mt-4 text-lg max-w-2xl mx-auto">
          Join AssetVerse today and experience seamless asset tracking,
          employee workflow automation, and real-time insights.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a
            href="/register-hr"
            className="px-8 py-3 bg-white text-emerald-700 font-semibold rounded-xl shadow hover:bg-emerald-50 transition"
          >
            Get Started Now
          </a>

          <a
            href="/contact"
            className="px-8 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white/20 transition"
          >
            Contact Us
          </a>
        </div>

        <p className="text-emerald-100 mt-6 text-sm">
          Need help? Our support team is available 24/7.
        </p>
      </div>
    </section>
  );
};

export default ContactCTA;
