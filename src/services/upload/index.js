const multer = require('multer');

const Storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uploads/images');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});

function mimetypeChecker(mimetype) {
  return ['image/png', 'image/jpg', 'image/jpeg'].includes(mimetype);
}

const imageUpload = multer({
  storage: Storage,
  fileFilter: (req, file, cb) => {
    if (mimetypeChecker(file.mimetype)) {
      return cb(null, true);
    }
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  },
});

// excels

const StorageExcel = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uploads/excels');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.originalname.split('.')[1]}`);
  },
});

function mimetypeExcelChecker(mimetype) {
  return ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(mimetype);
}

const excelUpload = multer({
  storage: StorageExcel,
  fileFilter: (req, file, cb) => {
    if (mimetypeExcelChecker(file.mimetype)) {
      return cb(null, true);
    }
    cb(null, false);
    return cb(new Error('Only .xlsx format allowed!'));
  },
});

module.exports = {
  imageUpload,
  excelUpload,
};
