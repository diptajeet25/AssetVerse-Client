import React from "react";
import { motion } from "framer-motion";
import {
  BuildingOffice2Icon,
  LightBulbIcon,
  FlagIcon,
  UsersIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const values = [
  {
    title: "Innovation",
    desc: "We continuously evolve our platform to meet the changing needs of modern businesses.",
    icon: <LightBulbIcon className="w-12 h-12 text-primary" />,
  },
  {
    title: "Reliability",
    desc: "Your data and assets are secure with enterprise-grade security and 99.9% uptime.",
    icon: <ShieldCheckIcon className="w-12 h-12 text-primary" />,
  },
  {
    title: "User-Centric",
    desc: "Every feature is designed with HR managers and employees in mind for maximum efficiency.",
    icon: <UsersIcon className="w-12 h-12 text-primary" />,
  },
  {
    title: "Excellence",
    desc: "We strive for perfection in every aspect of asset management and user experience.",
    icon: <FlagIcon className="w-12 h-12 text-primary" />,
  },
];

const stats = [
  { number: "100+", label: "Companies Trust Us" },
  { number: "1,200+", label: "Assets Managed Daily" },
  { number: "98%", label: "HR Satisfaction Rate" },
  { number: "24/7", label: "Support Available" },
];

const team = [
  {
    name: "Development Team",
    role: "Engineering Excellence",
    desc: "Building robust, scalable solutions with cutting-edge technology.",
  },
  {
    name: "Product Team",
    role: "User Experience",
    desc: "Designing intuitive interfaces that make asset management effortless.",
  },
  {
    name: "Support Team",
    role: "Customer Success",
    desc: "Ensuring your success with dedicated support and guidance.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-base-200 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-base-content">
              About AssetVerse
            </h1>
            <p className="text-xl md:text-2xl opacity-80 text-base-content leading-relaxed">
              Empowering modern businesses with intelligent asset management
              solutions that streamline operations and boost productivity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 bg-base-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-base-200 rounded-2xl p-8 shadow-lg">
                <BuildingOffice2Icon className="w-16 h-16 text-primary mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-base-content">
                  Our Story
                </h2>
                <p className="text-lg opacity-80 text-base-content leading-relaxed mb-4">
                  AssetVerse was born from a simple observation: managing company
                  assets shouldn't be complicated. Traditional methods were
                  time-consuming, error-prone, and disconnected from modern
                  workflows.
                </p>
                <p className="text-lg opacity-80 text-base-content leading-relaxed">
                  We set out to create a platform that brings together HR
                  managers and employees in a seamless, efficient ecosystem.
                  Today, AssetVerse helps hundreds of companies manage their
                  assets with confidence and ease.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team collaboration"
                className="rounded-2xl shadow-xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300"
            >
              <FlagIcon className="w-14 h-14 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-base-content">
                Our Mission
              </h3>
              <p className="text-lg opacity-80 text-base-content leading-relaxed">
                To simplify asset management for businesses of all sizes,
                enabling HR teams to focus on what matters most—their people.
                We believe technology should empower, not complicate.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300"
            >
              <RocketLaunchIcon className="w-14 h-14 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-base-content">
                Our Vision
              </h3>
              <p className="text-lg opacity-80 text-base-content leading-relaxed">
                To become the leading asset management platform globally,
                recognized for innovation, reliability, and exceptional user
                experience. We envision a world where asset management is
                effortless and intuitive.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-base-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-base-content">
              AssetVerse by the Numbers
            </h2>
            <p className="text-lg opacity-70 text-base-content">
              Trusted by companies worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-base-200 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base opacity-70 text-base-content">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-base-content">
              Our Core Values
            </h2>
            <p className="text-lg opacity-70 text-base-content">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-base-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition border border-base-300"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-base-content">
                  {value.title}
                </h3>
                <p className="opacity-70 text-sm leading-relaxed text-base-content">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-base-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-base-content">
              Our Team
            </h2>
            <p className="text-lg opacity-70 text-base-content">
              Passionate professionals dedicated to your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-base-200 rounded-2xl p-8 shadow-md hover:shadow-lg transition border border-base-300"
              >
                <UsersIcon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-base-content">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="opacity-70 text-sm leading-relaxed text-base-content">
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-6 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-base-content">
              Built with Modern Technology
            </h2>
            <p className="text-lg opacity-70 text-base-content">
              Leveraging cutting-edge tools for optimal performance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-2">
                  React
                </div>
                <div className="text-sm opacity-70 text-base-content">
                  Frontend Framework
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">
                  Node.js
                </div>
                <div className="text-sm opacity-70 text-base-content">
                  Backend Runtime
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">
                  MongoDB
                </div>
                <div className="text-sm opacity-70 text-base-content">
                  Database
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">
                  Firebase
                </div>
                <div className="text-sm opacity-70 text-base-content">
                  Authentication
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-content">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SparklesIcon className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the AssetVerse Community
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Experience the future of asset management. Start your journey with
              AssetVerse today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/auth/register-hr"
                className="btn btn-accent btn-lg text-lg px-8"
              >
                Get Started as HR
              </a>
              <a
                href="/auth/register-employee"
                className="btn btn-outline btn-lg text-lg px-8 border-primary-content text-primary-content hover:bg-primary-content hover:text-primary"
              >
                Join as Employee
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
