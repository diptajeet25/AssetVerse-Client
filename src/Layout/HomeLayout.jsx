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
import Navbar from '../Components/Navbar';

const HomeLayout = () => {

    <title>Home-AssetVerse</title>
  return (
    <div>
      <Navbar></Navbar>
        <Hero></Hero>
        <AboutSection></AboutSection>
        <Package ></Package>
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