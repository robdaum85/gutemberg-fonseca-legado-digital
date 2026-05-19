import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Career from '@/components/Career';
import Statistics from '@/components/Statistics';
// TODO: reativar futuramente
// import MultimediaClipping from '@/components/MultimediaClipping';
import Blog from '@/components/Blog';
import PodcastHighlight from '@/components/PodcastHighlight';
import InstagramFeed from '@/components/InstagramFeed';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ExercitoHero from '@/components/mobilizacao/ExercitoHero';
import FormApoiador from '@/components/mobilizacao/FormApoiador';
import FormLideranca from '@/components/mobilizacao/FormLideranca';
import FormDenuncia from '@/components/mobilizacao/FormDenuncia';
import WelcomePopup from '@/components/mobilizacao/WelcomePopup';

const Index = () => {
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <WelcomePopup />
      <Header />
      <Hero />
      <About />
      <Career />
      <Statistics />
      {/* TODO: reativar futuramente <MultimediaClipping /> */}
      <Blog />
      <PodcastHighlight />
      <InstagramFeed />
      <ExercitoHero />
      <FormApoiador />
      <FormLideranca />
      <FormDenuncia />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
