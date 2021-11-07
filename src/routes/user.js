const router = require('express').Router();

const {
  createUser, updateUser, deleteUser, findUsers, findOneUser, countUsers,
} = require('../models/users');

const { calculatePages } = require('../services/pagination');

router.post('/', async (req, res, next) => {
  try {
    const {
      firstname, lastname, ID, email, password, profile,
    } = req.body;

    const result = await createUser(firstname, lastname, ID, email, password, profile);

    res.status(200).send(result);
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const {
      firstname, lastname, ID, email, password, profile,
    } = req.body;
    const { id } = req.params;

    const result = await updateUser(id, firstname, lastname, ID, email, password, profile);

    res.status(200).send(result);
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteUser(id);

    res.status(200).send(result);
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await findOneUser(id);

    res.status(200).send(result);
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const {
      page = 1, limit = 0, order = 'desc', search,
    } = req.query;

    const total = await countUsers();

    let take = parseInt(limit, 10);
    if (limit <= 0) { take = total; }

    const result = await findUsers(page, order, search, take, limit);

    const pages = calculatePages(total, limit);

    res.status(200).send({ data: result, pages });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

module.exports = router;
