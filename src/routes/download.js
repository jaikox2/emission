const router = require('express').Router();

router.get('/:name', (req, res, next) => {
  try {
    const { name } = req.params;
    const path = `./public/uploads/excels/${name}`;

    return res.download(path);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
});

module.exports = router;
