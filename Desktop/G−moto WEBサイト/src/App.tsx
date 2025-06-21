import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Company from './pages/Company';
import Services from './pages/Services';
import Facilities from './pages/Facilities';
import FacilityDetail from './pages/FacilityDetail';
import Contact from './pages/Contact';
import Recruit from './pages/Recruit';
import RehabilitationDayService from './pages/RehabilitationDayService';
import './assets/styles/background.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/rehabilitation-dayservice" element={<RehabilitationDayService />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/facilities/:slug" element={<FacilityDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/recruit" element={<Recruit />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;