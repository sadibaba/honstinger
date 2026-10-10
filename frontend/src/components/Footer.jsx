import React from "react";

const Footer = () => (
  <footer className="relative z-10 bg-secondary/40 backdrop-blur-sm border-t border-secondary/30 mt-0">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-display text-2xl text-text-primary mb-3">Chronica</h3>
          <p className="text-text-secondary text-sm font-serif leading-relaxed">Stories of remarkable people, preserved with reverence.</p>
        </div>

        <div>
          <h4 className="text-text-primary font-medium text-sm uppercase tracking-wider mb-4">Platform</h4>
          <ul className="space-y-2">
            <li><a href="/" className="text-text-secondary hover:text-accent text-sm transition-colors">Home</a></li>
            <li><a href="/posts" className="text-text-secondary hover:text-accent text-sm transition-colors">Stories</a></li>
            <li><a href="/details" className="text-text-secondary hover:text-accent text-sm transition-colors">Details</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-text-primary font-medium text-sm uppercase tracking-wider mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a href="/terms" className="text-text-secondary hover:text-accent text-sm transition-colors">Terms</a></li>
            <li><a href="/privacy" className="text-text-secondary hover:text-accent text-sm transition-colors">Privacy</a></li>
            <li><a href="/cookies" className="text-text-secondary hover:text-accent text-sm transition-colors">Cookies</a></li>
            <li><a href="/disclaimer" className="text-text-secondary hover:text-accent text-sm transition-colors">Disclaimer</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-text-primary font-medium text-sm uppercase tracking-wider mb-4">Policies</h4>
          <ul className="space-y-2">
            <li><a href="/acceptable-use" className="text-text-secondary hover:text-accent text-sm transition-colors">Acceptable Use</a></li>
            <li><a href="/dmca" className="text-text-secondary hover:text-accent text-sm transition-colors">DMCA</a></li>
            <li><a href="/refund" className="text-text-secondary hover:text-accent text-sm transition-colors">Refund</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-secondary/30 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-secondary text-xs">© {new Date().getFullYear()} Chronica. All rights reserved.</p>
        <p className="text-text-secondary text-xs">Built with care. Made for readers.</p>
      </div>
    </div>
  </footer>
);

export default Footer;