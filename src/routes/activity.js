const router = require('express').Router();

const { getMultiFilesDataInSheet } = require('../services/excel_reader/activity');
const { filterActivity } = require('../services/excel_reader/filter');

router.post('/', async (req, res, next) => {
  try {
    const {
      scenarios,
      sectors,
      rangestart = 2010,
      rangeend = 2050,
      activities,
    } = req.body;

    let result = await getMultiFilesDataInSheet(scenarios);
    result = filterActivity(result, sectors, rangestart, rangeend, activities);

    return res.status(200).send(result);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
});

module.exports = router;
