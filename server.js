const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION !! APP SHUTTING NOW....');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected succesfully');
  });

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Getting requests now on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNCAUGHT REJECTION !!');
  console.log(err.name, err.message);
  server.close(() => {
    console.log('Server closing now');
    process.exit(1);
  });
});
