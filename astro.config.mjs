// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Prefer an explicit site URL; fall back to Netlify's URL or a neutral placeholder.
const siteUrl = process.env.SITE_URL || process.env.URL || 'https://example.com';
const basePath = (() => {
  const rawBase = process.env.BASE_PATH?.trim();
  if (!rawBase || rawBase === '/') return '/';
  const normalized = rawBase.startsWith('/') ? rawBase : `/${rawBase}`;
  return normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
})();

export default defineConfig({
  // Netlify static deployment
  site: siteUrl,
  base: basePath,
  server: {
    host: true,
    port: 4321,
  },
  preview: {
    host: true,
    port: 4321,
  },

  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en', 'ja'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  integrations: [mdx(), react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
