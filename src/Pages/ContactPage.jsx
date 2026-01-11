import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <EnvelopeIcon className="w-8 h-8 text-primary" />,
      title: "Email Us",
      content: "support@assetverse.com",
      link: "mailto:support@assetverse.com",
    },
    {
      icon: <PhoneIcon className="w-8 h-8 text-primary" />,
      title: "Call Us",
      content: "+880 1234-567890",
      link: "tel:+8801234567890",
    },
    {
      icon: <MapPinIcon className="w-8 h-8 text-primary" />,
      title: "Visit Us",
      content: "Tech City, Bangladesh",
    },
    {
      icon: <ClockIcon className="w-8 h-8 text-primary" />,
      title: "Support Hours",
      content: "Mon – Fri: 9:00 AM – 6:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      {/* Hero */}
      <section className="bg-base-200 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Have questions? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-base-200 p-6 rounded-2xl shadow border"
            >
              <div className="mb-4">{info.icon}</div>
              <h3 className="font-semibold mb-2">{info.title}</h3>
              {info.link ? (
                <a href={info.link} className="opacity-70 hover:opacity-100">
                  {info.content}
                </a>
              ) : (
                <p className="opacity-70">{info.content}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + Social */}
      <section className="py-20 px-6 bg-base-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Form */}
          <div className="bg-base-100 p-8 rounded-2xl shadow border">
            <h2 className="text-3xl font-bold mb-6">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {["name", "email", "subject"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                  className="input input-bordered w-full"
                />
              ))}

              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message"
                className="textarea textarea-bordered w-full"
              />

              <button
                disabled={isSubmitting}
                className="btn btn-primary w-full"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner" />
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Social */}
          <div className="bg-base-100 p-8 rounded-2xl shadow border">
            <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="btn btn-circle btn-outline">
                <Facebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="btn btn-circle btn-outline">
                <Twitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="btn btn-circle btn-outline">
                <Instagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="btn btn-circle btn-outline">
                <Linkedin />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
