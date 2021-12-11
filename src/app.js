/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
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
app.use('/api/images', express.static(path.join(__dirname, '../public/uploads/images')));
app.use('/api', require('./routes/upload'));
app.use('/api/excel/download', require('./routes/download'));
app.use('/api', require('./routes/authentication'));
app.use('/api/activity', require('./routes/activity'));
app.use('/api/emission', require('./routes/emission'));
app.use('/api/scenarios', require('./routes/getScenario'));

// authorize middleware
app.use(require('./middlewares/authen'));

// permission route
app.use('/api/users', require('./routes/user'));
app.use('/api/emission/types', require('./routes/emission_type'));
app.use('/api/scenarios', require('./routes/scenario'));

// error handler
app.use((err, req, res, next) => {
  if (err.code === 'ENOENT') {
    return res.status(404).send('ไม่พบไฟล์');
  }
  if (err.message && err.message.includes('Sheet')) {
    return res.status(404).send(err.message);
  }
  if (err.status === 500) {
    console.error(err);
    return res.status(500).send('ข้อผิดพลาดของเซิร์ฟเวอร์');
  }
  return next(err);
});

// server error
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(400).send({ message: err.message });
});

// app listen
app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
