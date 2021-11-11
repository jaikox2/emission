/* eslint-disable camelcase */
const router = require('express').Router();

const {
  createEmissionType,
  updateEmissionType,
  deleteEmissionType,
  getEmissionTypes,
} = require('../models/emission_types');

router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      template_file_name,
    } = req.body;

    // if all of that same is update, if not same is create
    const result = await createEmissionType(name, template_file_name);

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
      name,
      template_file_name,
    } = req.body;

    const result = await updateEmissionType(id, name, template_file_name);

    return res.status(200).send(result);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteEmissionType(id);

    return res.status(200).send(result);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const result = await getEmissionTypes();

    return res.status(200).send(result);
  } catch (error) {
    error.status = 500;
    return next(error);
  }
});

module.exports = router;
