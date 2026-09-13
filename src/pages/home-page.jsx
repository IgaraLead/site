import { useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { scrollToSection } from '../lib/smooth-scroll';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Showcase from '../components/Showcase';
import Process from '../components/Process';
import FinalCta from '../components/FinalCta';
import FloatingCta from '../components/FloatingCta';
import Footer from '../components/Footer';

export default function HomePage() {
  const lenis = useLenis();

  useEffect(() => {
    const id = window.location.hash.replace(/^#/, '');
    if (id) {
      requestAnimationFrame(() => {
        scrollToSection(lenis, id);
      });
    }
  }, [lenis]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Showcase />
        <Process />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
