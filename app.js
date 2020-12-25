const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require('path');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRouter');
const likeRouter = require('./routes/likeRouter');
const globalErrorHandler = require('./controller/errorController');

const app = express()

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Development loging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//BEFORE body-parser
app.post(
  "/webhook-checkout",
  bodyParser.raw({
    type: "application/json",
  })
);

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

app.use(cookieParser());

// routes for users
app.use('/api/user', userRouter);

// route for reviews
app.use('/api/review', reviewRouter);

//route for liked
app.use('/api/like', likeRouter);

// unkown routes
app.use('*', (req, res, next) => {
  // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  return res.status(404).render('notFound', {
    title: 'Fail',
    msg: `Can't find ${req.originalUrl} on this server!`
  })
});

app.use(globalErrorHandler);

module.exports = app