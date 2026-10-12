import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import BlogCard from "./BlogCard";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="section relative h-screen">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1790288025544-e06d7cc03070?w=600&auto=format&fit=crop&q=60" alt="Background" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary"></div>
      </motion.div>
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="section-title text-gradient">CHRONICA</motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="section-subtitle">Every remarkable life deserves to be remembered. Every reader deserves a place to discover them.</motion.p>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.0 }} className="text-text-secondary text-base max-w-2xl mx-auto mt-6 font-serif italic">A digital sanctuary for biographies, stories, and legacies of the people who shaped our world.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.3 }} className="mt-12 flex flex-wrap gap-4 justify-center">
          <a href="/posts" className="inline-flex items-center px-6 py-3 bg-accent text-primary rounded-full font-bold text-sm hover:bg-amber-300 transition-all hover:scale-105">
            Explore Stories
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a href="/about" className="inline-flex items-center px-6 py-3 bg-secondary/60 backdrop-blur-sm text-text-primary rounded-full font-medium text-sm hover:bg-secondary transition-all border border-secondary/50">Learn More</a>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="section bg-secondary">
    <div className="max-w-4xl mx-auto">
      <h2 className="section-title text-text-primary">WHY CHRONICA?</h2>
      <p className="section-subtitle text-text-secondary">In a world of fleeting content, Chronica is a sanctuary for stories that matter. Our editorial team researches and publishes thoughtful accounts of remarkable people, companies, and ideas. Each story is an invitation to explore the people and decisions that shaped our world.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {[
          { title: "Curated Biographies", desc: "Hand-picked stories from a diverse range of remarkable lives." },
          { title: "Timeless Design", desc: "An interface designed to let the stories take center stage." },
          { title: "A Global Archive", desc: "Connect with readers and writers from around the world." },
        ].map((item, i) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.2 }} className="glass p-8 rounded-2xl text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <h3 className="font-display text-2xl text-text-primary mb-2">{item.title}</h3>
            <p className="text-text-secondary text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedSection = ({ blogs, loading }) => (
  <section id="featured" className="section bg-primary">
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-16 gap-4">
        <h2 className="section-title text-text-primary !mb-0">FEATURED STORIES</h2>
        <a href="/posts" className="inline-flex items-center text-accent hover:text-amber-300 transition-colors text-sm font-medium group whitespace-nowrap">
          View All Stories
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-secondary/50 rounded-xl p-6 animate-pulse">
              <div className="h-48 bg-secondary rounded-lg mb-4" />
              <div className="h-3 bg-secondary rounded w-1/4 mb-3" />
              <div className="h-5 bg-secondary rounded mb-2" />
              <div className="h-3 bg-secondary rounded mb-4" />
            </div>
          ))}
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 6).map((blog, i) => (
            <motion.div key={blog.slug} initial={{ opacity: 1, y: 0 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}>
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-5 text-text-secondary">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">No stories yet</h3>
          <p className="text-text-secondary text-sm">Check back soon for remarkable lives.</p>
        </div>
      )}
    </div>
  </section>
);

const ContactSection = () => (
  <section id="contact" className="section bg-secondary">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="section-title text-text-primary">JOIN THE CONVERSATION</h2>
      <p className="section-subtitle text-text-secondary mb-12">Have a story to tell? A question to ask? We'd love to hear from you.</p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a href="/contact" className="inline-block px-10 py-4 bg-accent text-primary font-medium rounded-full hover:bg-amber-300 transition-all text-lg tracking-wider">Contact Us</a>
        <a href="/posts" className="inline-block px-10 py-4 bg-secondary/60 backdrop-blur-sm text-text-primary font-medium rounded-full hover:bg-secondary transition-all border border-secondary/50 text-lg tracking-wider">Browse Stories</a>
      </div>
    </div>
  </section>
);

const Home = ({ initialBlogs = [] }) => {
  return (
    <div className="bg-primary">
      <HeroSection />
      <AboutSection />
      <FeaturedSection blogs={initialBlogs} loading={false} />
      <ContactSection />
    </div>
  );
};

export default Home;