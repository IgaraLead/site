import { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Products from '../components/Products';
import Features from '../components/Features';
import Metrics from '../components/Metrics';
import Footer from '../components/Footer';

export default function HomePage() {
  useEffect(() => {
    const id = window.location.hash.replace(/^#/, '');
    if (id) {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <Features />
        <Metrics />
      </main>
      <Footer />
    </>
  );
}
