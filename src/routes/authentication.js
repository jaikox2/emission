const router = require('express').Router();

const { login, logout } = require('../services/authentication');

router.post('/login', async (req, res) => {
  try {
    const { ID, password } = req.body;
    const result = await login(ID, password);
    res.status(200).send(result);
  } catch (error) {
    res.status(401).send('authentication failed');
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    const { ID } = req.body;
    const result = await logout(ID);
    res.status(200).send(result);
  } catch (error) {
    error.message = 'user not found';
    next(error);
  }
});

module.exports = router;
