import React from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cursor from '../components/Cursor';
import CookieBanner from '../components/CookieBanner';
import '../index.css';

export default function Layout({ children }) {
  const pageContext = usePageContext();
  const urlPathname = pageContext?.urlPathname || '/';

  return (
    <ThemeProvider>
      <Cursor />
      <Navbar urlPathname={urlPathname} />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CookieBanner />
    </ThemeProvider>
  );
}