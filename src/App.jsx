import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page';
import PrivacidadePage from './pages/privacidade-page';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacidade" element={<PrivacidadePage />} />
      </Routes>
    </BrowserRouter>
  );
}
