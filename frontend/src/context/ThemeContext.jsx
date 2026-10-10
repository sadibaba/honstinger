// /context/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize from the DOM (set by inline script in +Head.jsx)
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.getAttribute('data-theme') || 'light';
  });
  const [mounted, setMounted] = useState(false);

  // On mount: sync React state with DOM + localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('theme');
    const domTheme = document.documentElement.getAttribute('data-theme');
    const initial =
      saved === 'light' || saved === 'dark'
        ? saved
        : domTheme === 'dark'
        ? 'dark'
        : 'light';

    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
    setMounted(true);
  }, []);

  // Whenever theme changes → update DOM + storage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
};