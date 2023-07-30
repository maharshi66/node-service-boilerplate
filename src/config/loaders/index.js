//TODO Uncomment databaseLoader and related once db configured
//* import databaseLoader from './databaseLoader';
import expressLoader from './expressLoader';
import logger from '../logger';

export default async ({ app, express }) => {
  //* const sequelize = await databaseLoader.authenticate();
  //* const dbPort = sequelize.options.port || 'default';
  logger.info(`Node env: ${process.env.NODE_ENV}`);
  logger.info(`Database connected successfully on port: 5432`);

  expressLoader({ app, express });
  logger.info('Express middleware configured');
};
