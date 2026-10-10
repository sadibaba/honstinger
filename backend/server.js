import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import { connectDB } from './config/db.js';
import './models/index.js';

const PORT = process.env.PORT || 5000;

process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION!', err.name, err.message);
  process.exit(1);
});

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(` Server on port ${PORT}`);
  });

  process.on('unhandledRejection', err => {
    console.error('UNHANDLED REJECTION!', err.name, err.message);
    server.close(() => process.exit(1));
  });

  process.on('SIGTERM', () => server.close(() => console.log('Terminated')));
});