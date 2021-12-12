const router = require('express').Router();

const { getMultiFilesDataInSheet } = require('../services/excel_reader/emission');
const { filterActivity, filterTechnology } = require('../services/excel_reader/filter');

router.post('/', async (req, res, next) => {
  try {
    const {
      scenarios,
      sectors,
      rangestart = 2010,
      rangeend = 2050,
      activities,
      technologies,
      sheet = 'Result_PM2.5',
    } = req.body;

    let result = await getMultiFilesDataInSheet(scenarios, sheet);
    result = filterActivity(result, sectors, rangestart, rangeend, activities);
    result = filterTechnology(result, technologies);

    return res.status(200).send(result);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
});

module.exports = router;
