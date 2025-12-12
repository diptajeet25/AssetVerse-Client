import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-14 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">AssetVerse</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Smart, secure, and efficient asset management — built for modern teams.
          </p>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="#" className="text-emerald-400 hover:text-emerald-300">support@assetverse.com</a></li>
            <li>Phone: <a href="#" className="text-emerald-400 hover:text-emerald-300">+880 1234-567890</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white text-xl"><Facebook /></a>
            <a href="#" className="hover:text-white text-xl"><Twitter /></a>
            <a href="#" className="hover:text-white text-xl"><Instagram /></a>
            <a href="#" className="hover:text-white text-xl"><Linkedin /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-slate-500 mt-10 pt-6 border-t border-slate-800 text-sm">
        © {new Date().getFullYear()} AssetVerse — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
