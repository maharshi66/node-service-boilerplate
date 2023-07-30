// import { SequelizeUniqueConstraintError, SequelizeValidationError } from 'sequelize';
import ErrorResponse from './errorResponse';

const errorHandler = (err, req, res, next) => {
  console.error(err);
  let error = { ...err };
  error.message = err.message;

  // // Sequelize unique constraint violation error
  // if (err instanceof SequelizeUniqueConstraintError) {
  //   const message = 'Field already exists or duplicate value encountered';
  //   error = new ErrorResponse(message, 422);
  // }

  // // Sequelize validation error
  // if (err instanceof SequelizeValidationError) {
  //   const message = err.errors.map((error) => error.message);
  //   error = new ErrorResponse(message, 422);
  // }

  res.status(error.status || 500).json({
    status: false,
    message: error.message || 'Server error! Request not completed',
    data: {},
  });

  next();
};

export default errorHandler;
