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
import { useSeo } from '@/lib/useSeo';
import { PERSON_ID, STATIC_PAGE_SEO, canonicalUrl } from '@/lib/siteSeo';

const Index = () => {
  const seo = STATIC_PAGE_SEO['/institucional'];
  useSeo({
    title: seo.title,
    description: seo.description,
    canonical: canonicalUrl(seo.path),
    image: seo.image,
    extraJsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: seo.title,
      url: canonicalUrl(seo.path),
      mainEntity: { '@id': PERSON_ID },
    },
  });
  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <WelcomePopup />
      <Header />
      <main id="conteudo-principal" tabIndex={-1}>
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
