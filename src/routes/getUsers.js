const router = require('express').Router();

const {
  findUsers, countUsers,
} = require('../models/users');

const { calculatePages } = require('../services/pagination');

router.get('/', async (req, res, next) => {
  try {
    const {
      page = 1, limit = 0, orderby = 'name', search,
    } = req.query;

    const searchs = search.trim().split(' ');
    const firstnameMultipleSearchs = searchs.map((keyword) => (
      {
        firstname: {
          contains: keyword,
          mode: 'insensitive',
        },
      }
    ));

    const lastnameMultipleSearchs = searchs.map((keyword) => (
      {
        lastname: {
          contains: keyword,
          mode: 'insensitive',
        },
      }
    ));

    const multipleSearch = [...firstnameMultipleSearchs, ...lastnameMultipleSearchs];

    const total = await countUsers(multipleSearch);

    let take = parseInt(limit, 10);
    if (limit <= 0) { take = total; }

    const result = await findUsers(page, orderby, multipleSearch, take, limit);

    const pages = calculatePages(total, limit);

    res.status(200).send({ data: result, pages });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

module.exports = router;
