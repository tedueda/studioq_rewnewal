import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ScenesPage from './pages/ScenesPage';
import ServicesPage from './pages/ServicesPage';
import FlowPage from './pages/FlowPage';
import PricingPage from './pages/PricingPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-c-bg font-noto">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/scenes" element={<ScenesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/flow" element={<FlowPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;