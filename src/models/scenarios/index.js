/* eslint-disable camelcase */
const { PrismaClient } = require('@prisma/client');

const { emissionSources } = new PrismaClient();

const userSelect = {
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

const select = {
  id: true,
  file_name: true,
  scenario_name: true,
  description: true,
  created_at: true,
  updated_at: true,
  user: {
    select: userSelect,
  },
  owner: {
    select: userSelect,
  },
  emission_activity_types: true,
};

async function upsertScenario(scenario_name, description,
  emission_activity_types_id, owner_id, user_id, file_name) {
  try {
    const emission = await emissionSources.findMany({
      where: {
        scenario_name,
        description,
        emission_activity_types_id,
        owner_id,
        user_id,
      },
    });

    if (emission.length) {
      // update
      return emissionSources.updateMany({
        where: {
          scenario_name,
          description,
          emission_activity_types_id,
          owner_id,
          user_id,
        },
        data: {
          file_name,
        },
      });
    }
    // create
    return emissionSources.create({
      select,
      data: {
        scenario_name,
        description,
        emission_activity_types_id,
        owner_id,
        user_id,
        file_name,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function updateScenario(id, scenario_name, description,
  emission_activity_types_id) {
  try {
    return emissionSources.update({
      select,
      where: {
        id: parseInt(id, 10),
      },
      data: {
        scenario_name,
        description,
        emission_activity_types_id,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function deleteScenario(id) {
  try {
    return emissionSources.delete({
      select,
      where: {
        id: parseInt(id, 10),
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function findScenarios(scenario_name, owner_id, activity_type_id) {
  try {
    const where = {};
    if (scenario_name) where.scenario_name = scenario_name;
    if (owner_id) where.owner_id = parseInt(owner_id, 10);
    if (activity_type_id) where.emission_activity_types_id = parseInt(activity_type_id, 10);
    return emissionSources.findMany({
      select,
      where,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  upsertScenario,
  updateScenario,
  deleteScenario,
  findScenarios,
};
