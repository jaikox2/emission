/* eslint-disable camelcase */
const readXlsxFile = require('read-excel-file/node');

async function getDataInSheet(file_name, sheetName) {
  return new Promise((resolve) => {
    readXlsxFile(`./public/uploads/excels/${file_name}`, { sheet: sheetName }).then((data) => {
      const headers = data[0];
      const source = data.slice(1);
      const sourceInObject = source.map((item) => (
        item.reduce((total, cerrent, index) => {
          if (Number.isInteger(headers[index])) {
            // total.data.push({
            //   year: headers[index],
            //   value: cerrent,
            // });
            // eslint-disable-next-line no-param-reassign
            total[headers[index].toString()] = cerrent;
          } else {
            // eslint-disable-next-line no-param-reassign
            total[headers[index]] = cerrent;
          }
          return total;
        }, {})
      ));
      resolve(sourceInObject);
    });
  });
}

function getSheets(file_name) {
  return new Promise((resolve, reject) => {
    readXlsxFile(`./public/uploads/excels/${file_name}`, { getSheets: true }).then((sheets, err) => {
      resolve(sheets);
      if (err) reject(err);
    });
  });
}

module.exports = {
  getDataInSheet,
  getSheets,
};
