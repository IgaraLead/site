import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Features from './components/Features';
import Metrics from './components/Metrics';
import Footer from './components/Footer';

export default function App() {
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
