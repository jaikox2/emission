const { PrismaClient } = require('@prisma/client');

const { user } = new PrismaClient();
const { hashPassword } = require('../../services/bcrypt');
const { calculateSkip } = require('../../services/pagination');

const select = {
  id: true,
  firstname: true,
  lastname: true,
  ID: true,
  email: true,
  profile: true,
  is_active: true,
  created_at: true,
  updated_at: true,
};

async function createUser(firstname, lastname, ID, email, password, profile) {
  try {
    const passwordHash = hashPassword(password);
    return await user.create({
      data: {
        firstname,
        lastname,
        ID,
        email,
        password: passwordHash,
        profile,
      },
      select,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function updateUser(id, firstname, lastname, ID, email, password, profile) {
  try {
    const passwordHash = hashPassword(password);
    return await user.update({
      data: {
        firstname,
        lastname,
        ID,
        email,
        password: passwordHash,
        profile,
      },
      where: {
        id: parseInt(id, 10),
      },
      select,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function deleteUser(id) {
  try {
    return await user.delete({
      where: {
        id: parseInt(id, 10),
      },
      select,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function findUsers(page = 1, order, search, take = 4, limit) {
  try {
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
    const skip = calculateSkip(page, limit);

    return user.findMany({
      where: {
        OR: multipleSearch,
      },
      select,
      skip,
      take,
      orderBy: {
        created_at: order,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function findOneUser(id) {
  try {
    return user.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      select,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function findOneUserByID(ID) {
  try {
    return user.findUnique({
      where: {
        ID,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function updateUserActive(id, is_active = true) {
  try {
    return user.update({
      where: {
        id,
      },
      data: {
        is_active,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function countUsers() {
  try {
    return user.count();
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  findUsers,
  findOneUser,
  findOneUserByID,
  updateUserActive,
  countUsers,
};
