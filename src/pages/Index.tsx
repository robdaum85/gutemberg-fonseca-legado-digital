
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Timeline from '@/components/Timeline';
import Programs from '@/components/Programs';
import Statistics from '@/components/Statistics';
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
      <Timeline />
      <Programs />
      <Statistics />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
