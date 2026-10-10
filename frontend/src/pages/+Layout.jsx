import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import Cursor from '../components/Cursor';
import { ThemeProvider } from '../context/ThemeContext';
import '../App.css';

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <Cursor />
      <div className="App bg-primary text-text-primary min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </div>
    </ThemeProvider>
  );
}