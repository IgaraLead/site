import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { ThemeProvider } from './lib/theme';
import { SmoothScrollProvider } from './lib/smooth-scroll';
import HomePage from './pages/home-page';

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, lenis]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
