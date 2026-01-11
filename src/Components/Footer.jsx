import React from "react";
import { Facebook, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-300 py-14 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">AssetVerse</h2>
          <p className="opacity-70 text-sm leading-relaxed max-w-xs">
            Smart, secure, and efficient asset management — built for modern teams.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/about" className="link">About Us</a>
            </li>
            <li>
              <a href="/contact" className="link">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:support@assetverse.com"
                className="text-emerald-600 link"
              >
                support@assetverse.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a
                href="tel:+8801234567890"
                className="text-emerald-600 link"
              >
                +880 1234-567890
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/diptajeet.roy.2025"
              target="_blank"
              rel="noopener noreferrer"
              className="link text-xl"
            >
              <Facebook />
            </a>

            <a
              href="https://github.com/diptajeet25"
              target="_blank"
              rel="noopener noreferrer"
              className="link text-xl"
            >
              <Github />
            </a>

            <a
              href="https://www.linkedin.com/in/diptajeet-roy"
              target="_blank"
              rel="noopener noreferrer"
              className="link text-xl"
            >
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center opacity-60 mt-10 pt-6 border-t border-base-400 text-sm">
        © {new Date().getFullYear()} AssetVerse — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
