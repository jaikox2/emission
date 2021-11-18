/* eslint-disable camelcase */
const router = require('express').Router();

const {
  upsertScenario,
  updateScenario,
  deleteScenario,
  findScenarios,
} = require('../models/scenarios');
const { getSheets, getDataInSheet } = require('../services/excel_reader');

router.post('/', async (req, res, next) => {
  try {
    const {
      scenario_name,
      file_name,
      description,
      activity_types_id,
      owner_id,
      user_id,
    } = req.body;

    const result = await upsertScenario(scenario_name,
      description, activity_types_id, owner_id, user_id, file_name);

    return res.status(200).send(result);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      scenario_name,
      description,
      activity_types_id,
    } = req.body;

    const result = await updateScenario(id, scenario_name, description, activity_types_id);

    return res.status(200).send(result);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { ids } = req.query;

    const result = await deleteScenario(ids);

    return res.status(200).send(result);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { scenario_name, owner_id, activity_type_id } = req.query;

    const result = await findScenarios(scenario_name, owner_id, activity_type_id);

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
