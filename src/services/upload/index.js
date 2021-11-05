const multer = require('multer');

const Storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/uploads');
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

module.exports = {
  imageUpload,
};
