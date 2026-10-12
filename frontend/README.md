# React + Vite

## Adding a blog post

Add one `.md` file to `src/data/posts/`. Its filename must match the `slug` in the frontmatter:

```md
---
title: "Your article title"
slug: your-article-title
date: 2026-10-12
description: "A concise summary for cards and search results."
category: Technology
image: ../../images/creator.jpg
---

Write the article here using Markdown headings and paragraphs.
```

The frontmatter fields `title`, `slug`, `date` (`YYYY-MM-DD`), `description`, `category`, and `image` are required. Use an image from `src/images` with a relative path such as `../../images/creator.jpg`. The build imports these files locally, creates an HTML page at `/blog/<slug>/`, and updates `sitemap.xml`; no route or data code changes are needed.

For Cloudflare Pages, use `npm run build` with `build/client` as the output directory. Replace `YOURDOMAIN.com` in `src/pages/+data.js` and the Web3Forms `YOUR_ACCESS_KEY` placeholder on the Contact page before launch.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
