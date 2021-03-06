/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const readXlsxFile = require('read-excel-file/node');

async function getDataInSheet(file_name, scenarioName, sheet) {
  return new Promise((resolve, reject) => {
    readXlsxFile(`./public/uploads/excels/${file_name}`, { sheet }).then((data) => {
      const headers = data[0];
      const source = data.slice(1);
      const sourceInObject = source.reduce((totalItem, item) => {
        const result = item.reduce((total, cerrent, index) => {
          if (Number.isInteger(headers[index])) {
            total.data.push({
              year: headers[index],
              value: parseFloat(cerrent).toFixed(2) * 1,
              name: scenarioName,
              sector: total.Sector,
              activity: total.Activity,
              technology: total.Technology,
            });
          } else {
            total[headers[index]] = cerrent;
          }
          return total;
        }, { data: [] });
        totalItem = [...totalItem, ...result.data];
        return totalItem;
      }, []);
      resolve(sourceInObject);
    }).catch((err) => {
      if (err) reject(err);
    });
  });
}

async function getMultiFilesDataInSheet(scenarios, sheet) {
  try {
    const dataScenarios = await Promise.all(scenarios.map(async (scenario) => {
      try {
        const data = await getDataInSheet(scenario.file, scenario.name, sheet);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }));

    return [].concat(...dataScenarios);
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  getDataInSheet,
  getMultiFilesDataInSheet,
};
