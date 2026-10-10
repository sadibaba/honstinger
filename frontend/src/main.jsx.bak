import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Loader fade-out
function hideLoader() {
  const loader = document.querySelector('.loader-container');
  if (!loader) return;

  loader.style.transition = 'opacity 0.8s ease-out';
  loader.style.opacity = '0';
  setTimeout(() => loader.remove(), 800);
}

// ============================================================
// APP START — SPA mode
// ============================================================
function startApp() {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// ============================================================
// LOADER (client-side only)
// ============================================================
function initLoader() {
  const clockEl = document.getElementById('loader-clock');
  const textEl = document.getElementById('loader-text');

  const phrases = [
    'Preparing your experience...',
    'Curating stories...',
    'Connecting worlds...',
    'Ready.',
  ];
  let i = 0;

  const textInterval = setInterval(() => {
    if (textEl) textEl.textContent = phrases[i % phrases.length];
    i++;
  }, 1200);

  const tick = () => {
    if (clockEl) {
      clockEl.textContent = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
      });
    }
  };
  tick();
  const clockInterval = setInterval(tick, 1000);

  setTimeout(() => {
    clearInterval(textInterval);
    clearInterval(clockInterval);
    hideLoader();
    startApp();
  }, 2800);
}

// ============================================================
// BOOT — SSR-safe
// ============================================================
if (typeof window !== 'undefined') {
  // Client-side only
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoader);
  } else {
    initLoader();
  }
}

export { startApp, hideLoader };