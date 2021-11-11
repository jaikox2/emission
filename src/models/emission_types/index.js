/* eslint-disable camelcase */
const { PrismaClient } = require('@prisma/client');

const { emissionActivityTypes } = new PrismaClient();

const select = {
  id: true,
  name: true,
  template_file_name: true,
};

function createEmissionType(name, template_file_name) {
  try {
    return emissionActivityTypes.create({
      select,
      data: {
        name,
        template_file_name,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function updateEmissionType(id, name, template_file_name) {
  try {
    return emissionActivityTypes.update({
      select,
      where: {
        id: parseInt(id, 10),
      },
      data: {
        name,
        template_file_name,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function deleteEmissionType(id) {
  try {
    return emissionActivityTypes.delete({
      select,
      where: {
        id: parseInt(id, 10),
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function getEmissionTypes() {
  try {
    return emissionActivityTypes.findMany({
      select,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  createEmissionType,
  updateEmissionType,
  deleteEmissionType,
  getEmissionTypes,
};
