import vikeReact from 'vike-react/config';

export default {
  extends: vikeReact,
  ssr: true,
  prerender: true,
  bodyAttributes: {
    'data-theme': 'light',
  },
};