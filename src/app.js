/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(logger('dev', {
  skip: (req, res) => (res.statusCode < 400),
}));

// public route
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/authentication'));

// authorize middleware
app.use(require('./middlewares/authen'));

// permission route
app.use('/api/users', require('./routes/user'));

// error handler
app.use((err, req, res, next) => {
  if (err.status === 500) {
    console.error(err);
    return res.status(500).send('ข้อผิดพลาดของเซิร์ฟเวอร์');
  }
  return next(err);
});

// server error
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

// app listen
app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
