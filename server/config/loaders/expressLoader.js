import cors from 'cors';
import xss from 'xss-clean';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import ErrorResponse from '../../utils/errorResponse';
import errorHandler from '../../utils/errorHandler';

export default ({ app, express }) => {
  // Enable Cross-Origin Resource Sharing (CORS)
  app.use(cors());

  // Parse incoming request bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))

  // Set security HTTP headers
  app.use(helmet());

  // Prevent XSS attacks
  app.use(xss());

  // Rate limiting to prevent abuse
  const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  });
  app.use(limiter);

  // Logging HTTP requests to console during development
  if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');    
    app.use(morgan('dev'));
  }

  // Custom error response handling
  app.use((req, res, next) => {
    res.error = (message, statusCode) => {
      const error = new ErrorResponse(message, statusCode);
      next(error);
    };
    next();
  });

  // Error handler middleware
  app.use(errorHandler);

  // Health route
  app.get('/health', (req, res) => {
    res.status(200).send('Health OK');
  });

  return app;
}
