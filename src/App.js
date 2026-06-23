import React, { useState, useEffect } from 'react';
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import FleetPage from "./Pages/FleetPage";
import HomePage from "./Pages/HomePage";
import TeamPage from "./Pages/TeamPage";
import ManageBookings from "./Pages/ManageBookings";
import LiveChatWidget from "./Components/LiveChatWidget";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/bookings" element={<ManageBookings />} />
      </Routes>
      <Footer />
      <LiveChatWidget />
    </BrowserRouter>
  );
}

export default App;
