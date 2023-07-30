import express from 'express';
import dotenv from 'dotenv';
import appLoader from './config/loaders';
import logger from './utils/logger'
export const app = express();
require('dotenv').config({path: __dirname + '../.env' });

export const start = async () => {
  try {
    await appLoader({ app, express });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      logger.info("Started")
    });
  } catch (e) {
    console.error('Error starting the server:', e);
  }
};
