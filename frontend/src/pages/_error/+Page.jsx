import React from 'react';
import { usePageContext } from 'vike-react/usePageContext';

export default function ErrorPage() {
  const { is404 } = usePageContext();

  return (
    <section className="min-h-screen bg-primary px-4 pt-40 pb-20 text-center">
      <p className="text-accent text-xs uppercase tracking-[0.3em] mb-4">Chronica</p>
      <h1 className="font-display text-5xl sm:text-6xl text-text-primary mb-5">
        {is404 ? 'Page not found' : 'Something went wrong'}
      </h1>
      <p className="text-text-secondary font-serif mb-8">
        {is404 ? 'The page you are looking for may have moved or no longer exists.' : 'Please try again later.'}
      </p>
      <a href="/" className="inline-flex rounded-full bg-accent px-6 py-3 font-bold text-primary hover:bg-amber-300">
        Go to the home page
      </a>
    </section>
  );
}
