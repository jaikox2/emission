/* eslint-disable no-param-reassign */
function filterActivity(data, sectors = [], rangestart, rangeend, activities = []) {
  if (rangestart && rangeend) {
    data = data.filter((item) => rangestart <= item.year && item.year <= rangeend);
  }

  if (sectors.length > 0) {
    data = data.filter((item) => sectors.includes(item.sector));
  }

  if (activities.length > 0) {
    data = data.filter((item) => activities.includes(item.activity));
  }

  return data;
}

function filterTechnology(data, technologies = []) {
  if (technologies.length > 0) {
    data = data.filter((item) => technologies.includes(item.technology));
  }

  return data;
}

module.exports = {
  filterActivity,
  filterTechnology,
};
