import vikeReact from 'vike-react/config';
import Layout from './+Layout';

export default {
  extends: vikeReact,
  Layout,
  title: 'Chronica — Stories of Remarkable People',
  description: 'A digital sanctuary for biographies, stories, and legacies of the people who shaped our world.',
  ssr: true,
  prerender: true,   
  bodyAttributes: {
    'data-theme': 'light',
  },
};