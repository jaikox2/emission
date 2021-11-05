const bcrypt = require('bcrypt');

function hashPassword(plaintextPassword) {
  return bcrypt.hashSync(plaintextPassword, 10); // return hash text
}

function comparePassword(plaintextPassword, hash) {
  return bcrypt.compareSync(plaintextPassword, hash); // return true if correct password
}

module.exports = {
  hashPassword,
  comparePassword,
};
