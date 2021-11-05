const { comparePassword } = require('../bcrypt');
const { generateToken } = require('../jwt');
const { findOneUserByID, updateUserActive } = require('../../models/users');

async function login(ID, password) {
  try {
    const user = await findOneUserByID(ID);

    if (!user) {
      return Promise.reject(new Error('user not found'));
    }

    const isCurrect = comparePassword(password, user.password);

    if (!isCurrect) {
      return Promise.reject(new Error('password invalid'));
    }

    updateUserActive(user.id, true);

    const data = {
      id: user.id,
      ID: user.ID,
      email: user.email,
      token: null,
    };

    const token = generateToken(data);
    data.token = token;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function logout(ID) {
  try {
    const user = await findOneUserByID(ID);
    updateUserActive(user.id, false);

    return 'success';
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  login,
  logout,
};
