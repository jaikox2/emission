const { verifyToken } = require('../../services/jwt');

function isBearerToken(token) {
  return new Promise((resolve, reject) => {
    let result = null;
    let isBearer = null;
    const subtoken = token.split(' ');
    if (subtoken.length === 0) {
      return reject(new Error('not found access token'));
    }

    [isBearer, result] = subtoken;
    if (isBearer !== 'Bearer') {
      return reject(new Error('token is not Bearer'));
    }
    return resolve(result);
  });
}

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const accessToken = await isBearerToken(authorization);
    const decoded = await verifyToken(accessToken);

    if (decoded) {
      req.body.user_id = decoded.data.id;
      return next();
    }

    return res.status(401).send('authentication failed');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('middleware err: ', error);
    return res.status(401).send('authentication failed');
  }
};
