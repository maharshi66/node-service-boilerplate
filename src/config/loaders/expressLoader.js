import cors from 'cors';
import xss from 'xss-clean';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import ErrorResponse from '../../utils/errorResponse';
import errorHandler from '../../utils/errorHandler';
import sampleUserRoutes from '../../app/routes/sample.user.routes';

export default ({ app, express }) => {
  // Enable Cross-Origin Resource Sharing (CORS)
  app.use(cors());

  // Parse incoming request bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Set security HTTP headers
  app.use(helmet());

  // Prevent XSS attacks
  app.use(xss());

  // Logging HTTP requests to console during development
  if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
  }

  // Rate limiting to prevent abuse
  const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  });
  app.use(limiter);

  // Mounting the routes
  app.use('/sample-users', sampleUserRoutes);

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
    // res.status(200).send('Health OK');
    const htmlResponse = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Health Check</title>
        <style>
          /* CSS styles here */
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .content {
            text-align: center;
          }

          .health {
            font-weight: bold;
            font-size: 250%;
            color: black;
          }

          .ok {
            font-weight: bold;
            font-size: 250%;
            color: green;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <p>
              <span class="health">Health: </span>
              <span class="ok">OK</span>
            </p>
            <p class="version">Application Version: v1.0.0</p>
            <p>This is an official response from the GoParts backend service.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(htmlResponse);
  });

  return app;
};
