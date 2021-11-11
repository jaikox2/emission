const router = require('express').Router();

const {
  imageUpload,
  excelUpload,
} = require('../services/upload');

router.post('/profile/upload',
  imageUpload.single('image'), (req, res, next) => {
    try {
      // check file exists
      if (!req.file) {
        const err = new Error('Not found that file');
        return next(err);
      }

      return res.status(200).send(req.file.filename);
    } catch (error) {
      error.status = 500;
      return next(error);
    }
  });

router.post('/excel/upload',
  excelUpload.single('file'), (req, res, next) => {
    try {
      // check file exists
      if (!req.file) {
        const err = new Error('Not found that file');
        return next(err);
      }

      return res.status(200).send(req.file.filename);
    } catch (error) {
      error.status = 500;
      return next(error);
    }
  });

module.exports = router;
