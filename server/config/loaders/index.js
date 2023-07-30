// import databaseLoader from './databaseLoader';
import expressLoader from './expressLoader';

export default async ({ app, express }) => {
    // const sequelize = await databaseLoader.authenticate();
    // const dbConfig = sequelize.options;
    // const dbPort = dbConfig.port || 'default';
    console.log(`Database connected successfully on port: 3000`);
  
    expressLoader({ app, express });
    console.log('Express middleware configured')
}