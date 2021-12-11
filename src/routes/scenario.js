/* eslint-disable camelcase */
const router = require('express').Router();

const {
  upsertScenario,
  updateScenario,
  deleteScenario,
} = require('../models/scenarios');

router.post('/', async (req, res, next) => {
  try {
    const {
      scenario_name,
      file_name,
      description,
      owner_id,
      user_id,
    } = req.body;

    const result = await upsertScenario(scenario_name,
      description, owner_id, user_id, file_name);

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
    } = req.body;

    const result = await updateScenario(id, scenario_name, description);

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

module.exports = router;
