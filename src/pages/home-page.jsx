import { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Showcase from '../components/Showcase';
import Process from '../components/Process';
import FinalCta from '../components/FinalCta';
import Footer from '../components/Footer';

export default function HomePage() {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, '');
    if (id) {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView();
      });
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Process />
        <Showcase />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
