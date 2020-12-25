// const popup = require('popups')
const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleTypeErrorDB = err => {
  const message = `Invalid ID, User with this ID already exists.`
  console.log(message)
  return new AppError(message,400)
}

// const handleNotFoundError = err =>{
//   const
// }

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  cosnsole.log(message);
  // return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleInvalidUserError = err =>{
  const message = `Invalid input data. This User does not exists. Please signup to continue.`
  return new AppError(message, 400)
}

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  // B) RENDERED WEBSITE
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  });
};

const sendErrorProd = (err, req, res) => {
  console.log('Hy from the production error')
  // A) API
      res.status(err.statusCode).json({
        error:err,
        title: err.status,
        msg: err.message
      });

};

module.exports = (err, req, res, next) => { // TODO : Handle the errors
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    console.log(error)
    console.log('_________________________________')

    // if(error.statusCode === 404) handle
    if (error._message === 'User validation failed') // Passwords does not match
      error = handleValidationErrorDB(error);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if(error.name === 'MongoError') error = handleTypeErrorDB(error);  // User already exists
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if(error.message === `Cannot read property 'correctPassword' of null`) error = handleInvalidUserError(error)
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};