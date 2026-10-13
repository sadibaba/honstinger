import React from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { getPostBySlug } from '../data/posts';

const SITE_URL = 'https://chronica.website';
const pageSeo = {
  '/': {
    title: 'Chronica — Stories of Remarkable People',
    description: 'Explore thoughtful stories about remarkable people, influential companies, and ideas that shape our world.',
  },
  '/posts': {
    title: 'All Stories | Chronica',
    description: 'Browse Chronica’s complete collection of original stories and company histories.',
  },
  '/about': {
    title: 'About Chronica',
    description: 'Learn about Chronica, an independent publication sharing clear, carefully researched stories.',
  },
  '/contact': {
    title: 'Contact Chronica',
    description: 'Contact the Chronica editorial team with questions, corrections, or story suggestions.',
  },
  '/privacy': {
    title: 'Privacy Policy | Chronica',
    description: 'Read how Chronica handles information when you visit this static publication.',
  },
  '/terms': {
    title: 'Terms of Use | Chronica',
    description: 'Review the terms that apply when you read and use the Chronica website.',
  },
  '/cookies': {
    title: 'Cookie Policy | Chronica',
    description: 'Learn about browser storage and cookies used by the Chronica website.',
  },
  '/disclaimer': {
    title: 'Disclaimer | Chronica',
    description: 'Read the editorial and informational disclaimer for Chronica articles.',
  },
  '/acceptable-use': {
    title: 'Acceptable Use Policy | Chronica',
    description: 'Review the rules for responsible use of the Chronica website and its content.',
  },
  '/dmca': {
    title: 'Copyright and DMCA | Chronica',
    description: 'Find instructions for submitting a copyright concern about content on Chronica.',
  },
  '/refund': {
    title: 'Refund Policy | Chronica',
    description: 'Review Chronica’s refund policy for any paid products or services.',
  },
  '/404': {
    title: 'Page Not Found | Chronica',
    description: 'The page you requested could not be found.',
    noindex: true,
  },
};

export default function Head() {
  const pageContext = usePageContext();
  const pathname = (pageContext.urlPathname || '/').replace(/\/+$/, '') || '/';
  const post = pageContext.routeParams?.slug
    ? getPostBySlug(pageContext.routeParams.slug)
    : undefined;
  const article = post && {
    title: post.title,
    description: post.description,
    date: post.date,
    image: post.image.startsWith('http')
      ? post.image
      : `${SITE_URL}${post.image.startsWith('/') ? '' : '/'}${post.image}`,
    canonical: `${SITE_URL}/blog/${post.slug}`,
    category: post.category,
  };
  const metadata = post
    ? { title: `${post.title} | Chronica`, description: post.description }
    : pageContext.is404
      ? pageSeo['/404']
      : pageSeo[pathname] || pageSeo['/404'];
  const seo = {
    ...metadata,
    image: article?.image,
    canonical: `${SITE_URL}${post ? `/blog/${post.slug}` : pageSeo[pathname] ? pathname : '/404'}`,
  };
  const structuredData = article && {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: 'Chronica Editorial',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Chronica',
    },
    articleSection: article.category,
    mainEntityOfPage: article.canonical,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.canonical} />
      {seo.noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={seo.canonical} />
      {seo.image && <meta property="og:image" content={seo.image} />}
      {article && <meta property="article:published_time" content={article.date} />}
      <meta name="twitter:card" content={seo.image ? 'summary_large_image' : 'summary'} />
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
      )}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var s=localStorage.getItem('theme');var t=(s==='dark'||s==='light')?s:'light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
        }}
      />
    </>
  );
}
