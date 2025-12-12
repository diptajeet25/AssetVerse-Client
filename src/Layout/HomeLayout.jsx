import React from 'react';
import Hero from '../Components/Hero';
import AboutSection from '../Components/AboutSection';
import FeaturesSection from '../Components/FeaturesSection';
import TestimonialsSection from '../Components/TestimonialsSection';
import WorkingProcess from '../Components/WorkingProcess';
import FAQSection from '../Components/FAQSection';
import ContactCTA from '../Components/ContactCTA';
import Footer from '../Components/Footer';
import Package from '../Components/Package';

const HomeLayout = () => {
  const packagePromise=fetch("/packages.json")
  .then(res=>res.json());
    <title>Home-AssetVerse</title>
  return (
    <div>
        <Hero></Hero>
        <AboutSection></AboutSection>
        <Package packagePromise={packagePromise}></Package>
        <FeaturesSection></FeaturesSection>
        <TestimonialsSection></TestimonialsSection>
        <WorkingProcess></WorkingProcess>
        <FAQSection></FAQSection>
        <ContactCTA></ContactCTA>
        <Footer></Footer>
    </div>
  );
};

export default HomeLayout;