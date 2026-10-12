import React from 'react';
import MarkdownContent from './MarkdownContent';

export default function BlogDetail({ post }) {
  const readingTime = Math.max(1, Math.ceil(post.content.trim().split(/\s+/).length / 200));

  return (
    <div className="min-h-screen bg-primary">
      <div className="container mx-auto px-4 pt-32 pb-16">
        <a href="/posts" className="inline-flex items-center text-accent hover:text-amber-300 text-sm group mb-8">
          <svg className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Stories
        </a>

        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <span className="inline-flex items-center px-3 py-1 bg-secondary text-accent rounded-full text-xs font-medium mb-4">
              {post.category}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-text-primary mb-5 leading-tight">
              {post.title}
            </h1>
            <p className="text-text-secondary text-lg font-serif mb-5">{post.description}</p>
            <p className="text-text-secondary text-sm">
              Chronica Editorial · <time dateTime={post.date}>{post.formattedDate}</time> · {readingTime} min read
            </p>
          </header>

          <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-10">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="text-text-secondary leading-relaxed text-base sm:text-lg font-serif">
            <MarkdownContent content={post.content} />
          </div>
        </article>
      </div>
    </div>
  );
}
