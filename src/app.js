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

// routers
const uploadRoute = require('./routes/upload');

// use routers need cors
app.use('/api', uploadRoute);
app.use('/api', (req, res, next) => {
  try {
    res.send('emission app');
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

// error handler
app.use((err, req, res, next) => {
  if (err.status === 500) {
    console.error(err);
    return res.status(500).send({
      message: 'ข้อผิดพลาดของเซิร์ฟเวอร์',
    });
  }
  return next(err);
});

// server error
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({
    message: err.message,
  });
});

// app listen
app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
