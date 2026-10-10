import { navigate } from 'vike/client/router';
import { useEffect } from 'react';

/**
 * SERVER-SIDE REDIRECT
 * 
 * Vike `onBeforeRender` server par chalta hai.
 * Ye SSR mein HTTP 302 redirect karta hai — AdSense crawler ke liye bhi redirect hoga.
 */
export function onBeforeRender(pageContext) {
  return {
    pageContext: {
      redirectTo: '/home',
    },
  };
}

/**
 * CLIENT-SIDE FALLBACK
 * 
 * Agar kisi wajah se server redirect kaam na kare, to client-side par
 * useEffect se redirect ho jayega.
 */
export default function Page() {
  useEffect(() => {
    navigate('/home');
  }, []);

  // Loading spinner jab tak redirect ho raha hai
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto mb-4" />
        <p className="text-text-secondary text-sm">Redirecting...</p>
      </div>
    </div>
  );
}