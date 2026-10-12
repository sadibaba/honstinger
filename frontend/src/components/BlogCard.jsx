import React from 'react';
import { navigate } from 'vike/client/router';
import { motion } from 'framer-motion';

const BlogCard = ({ blog, onReadMore }) => {
  const { slug, title, description, category, formattedDate, image, readingTime } = blog;

  const handleReadMore = () => {
    if (onReadMore) { onReadMore(slug); } else { navigate(`/blog/${slug}`); }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-secondary/50 rounded-2xl overflow-hidden border border-secondary/50 hover:border-accent/30 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5"
    >
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={handleReadMore}>
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/80 text-accent text-xs font-medium backdrop-blur-sm">{category}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-amber-300 flex items-center justify-center">
              <span className="text-primary text-xs font-bold">C</span>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Chronica Editorial</p>
              <p className="text-xs text-text-secondary">{formattedDate}</p>
            </div>
          </div>
        </div>

        <h3 className="font-display text-2xl text-text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2 cursor-pointer" onClick={handleReadMore}>{title}</h3>
        <p className="text-text-secondary text-sm mb-6 line-clamp-2 font-serif">{description}</p>

        <div className="flex items-center justify-between">
          <span className="text-text-secondary text-xs flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {readingTime}
          </span>
          <button onClick={handleReadMore} className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 rounded-full font-medium text-xs transition-all duration-300 group/btn">
            Read
            <svg className="w-3.5 h-3.5 ml-1 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;