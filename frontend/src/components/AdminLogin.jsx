import React, { useState } from "react";
import { navigate } from "vike/client/router";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    setTimeout(() => {
      if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminEmail", formData.email);
        navigate("/");
      } else {
        setError("Invalid admin credentials");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/50 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 w-full max-w-md">
        <div className="glass rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent to-amber-300 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h1 className="font-display text-4xl text-text-primary tracking-wider">Chronica</h1>
            <p className="text-text-secondary text-sm mt-2 font-serif">Admin Access Only</p>
          </div>

          {error && (<div className="mb-6 p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">{error}</div>)}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-text-secondary text-xs mb-2 uppercase tracking-wider">Admin Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" className="w-full px-4 py-3 bg-primary/50 border border-secondary/50 rounded-lg text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-accent focus:border-transparent text-sm transition-all" placeholder="admin@chronica.com" />
            </div>

            <div>
              <label className="block text-text-secondary text-xs mb-2 uppercase tracking-wider">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required autoComplete="current-password" className="w-full px-4 py-3 bg-primary/50 border border-secondary/50 rounded-lg text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-accent focus:border-transparent text-sm transition-all" placeholder="••••••••" />
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-accent text-primary font-bold rounded-lg hover:bg-amber-300 transition-all duration-300 disabled:opacity-50 text-sm tracking-wider">
              {loading ? "Verifying..." : "Login as Admin"}
            </button>
          </form>

          <p className="text-center text-text-secondary text-xs mt-6 font-serif">Only administrators can access this area.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;