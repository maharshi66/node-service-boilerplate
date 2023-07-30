import { start } from './server';

start();

process.on('uncaughtException', (err, _) => {
  console.error('Uncaught exception occurred:', err);
  console.log(`Server closed gracefully due to uncaught exception.`);
  process.exit(1);
});

process.on('unhandledRejection', (err, _) => {
  console.log(`Server Error: ${err}`);
});

process.on('unhandledRejection', (err, _) => {
  console.log(`Server Error: ${err}`);})
