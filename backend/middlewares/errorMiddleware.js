export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const notFound = (req, res, next) => {
  next(new AppError(`Not Found: ${req.originalUrl}`, 404));
};

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors || {}).map(e => e.message).join(', ');
    return res.status(400).json({ success: false, message: messages });
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ success: false, message: 'Duplicate entry' });
  }
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ success: false, message: 'File too large (max 5MB)' });
  }

  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      success: false, message: err.message, stack: err.stack,
    });
  }

  return res.status(err.statusCode).json({
    success: false, message: err.isOperational ? err.message : 'Something went wrong',
  });
};