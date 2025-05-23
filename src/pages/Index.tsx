
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Career from '@/components/Career';
import Achievements from '@/components/Achievements';
import Days365 from '@/components/Days365';
import Statistics from '@/components/Statistics';
import MultimediaClipping from '@/components/MultimediaClipping';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Career />
      <Achievements />
      <Days365 />
      <Statistics />
      <MultimediaClipping />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
