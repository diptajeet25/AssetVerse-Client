import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="bg-base-200 px-6 py-16 w-full md:w-[90%] lg:w-[80%] mx-auto my-8 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Manage Company Assets Easily with AssetVerse
          </h1>

          <p className="mt-4 opacity-70 text-lg">
            Track devices, assign assets, and manage workflows — all in one simple dashboard.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="/auth/register-hr"
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
            >
              Get Started
            </a>

            <a
              href="/auth/login"
              className="px-6 py-3 btn btn-outline rounded-lg font-medium transition"
            >
              Login
            </a>
          </div>
        </motion.div>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img
            src="https://www.slnsoftwares.com/images/product/it-asset-mangement/it-asset-mangement.png"
            alt="Hero Illustration"
            className="w-full max-w-md h-auto rounded-xl shadow-md"
          />
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
