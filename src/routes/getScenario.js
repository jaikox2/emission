/* eslint-disable camelcase */
const router = require('express').Router();

const {
  findScenarios,
} = require('../models/scenarios');
const { getSheets, getDataInSheet } = require('../services/excel_reader');

router.get('/', async (req, res, next) => {
  try {
    const { scenario_name, owner_id } = req.query;

    const result = await findScenarios(scenario_name, owner_id);

    return res.status(200).send(result);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
});

router.get('/view/structure', async (req, res, next) => {
  try {
    const { file_name, sheet_name = 0 } = req.query;

    const sheets = await getSheets(file_name);

    let sheetName = sheet_name;
    if (!sheetName) {
      sheetName = sheets[1].name;
    }

    const data = await getDataInSheet(file_name, sheetName);

    return res.status(200).send({ sheets: sheets.slice(1), data });
  } catch (error) {
    error.status = 500;
    return next(error);
  }
});

module.exports = router;
