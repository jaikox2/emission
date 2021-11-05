const jwt = require('jsonwebtoken');

function generateToken(data) {
  const token = jwt.sign({
    data,
  },
  process.env.APP_TOKEN_SECRET || 'pangdev1996', { expiresIn: '24h' });
  return token;
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.APP_TOKEN_SECRET || 'pangdev1996', (err, decoded) => {
      if (decoded) resolve(decoded);
      reject(err);
    });
  });
}

module.exports = {
  generateToken,
  verifyToken,
};
