/* eslint-disable camelcase */
const readXlsxFile = require('read-excel-file/node');

async function getDataInSheet(file_name, sheetName) {
  return new Promise((resolve, reject) => {
    readXlsxFile(`./public/uploads/excels/${file_name}`, { sheet: sheetName }).then((data) => {
      let headers = data[0];
      const source = data.slice(1);
      const sourceInObject = source.map((item) => (
        item.reduce((total, cerrent, index) => {
          // if (Number.isInteger(headers[index])) {
          // total.data.push({
          //   year: headers[index],
          //   value: cerrent,
          // });
          // eslint-disable-next-line no-param-reassign
          // total[headers[index]] = cerrent;
          // } else {
          if (!Number.isNaN(parseFloat(cerrent))) {
            // eslint-disable-next-line no-param-reassign
            total[headers[index]] = parseFloat(cerrent).toFixed(2) * 1;
          } else {
            // eslint-disable-next-line no-param-reassign
            total[headers[index]] = cerrent;
          }
          // }
          return total;
        }, {})
      ));
      headers = headers.map((header) => header.toString());
      resolve({ headers, values: sourceInObject });
    }).catch((err) => {
      if (err) reject(err);
    });
  });
}

function getSheets(file_name) {
  return new Promise((resolve, reject) => {
    readXlsxFile(`./public/uploads/excels/${file_name}`, { getSheets: true }).then((sheets) => {
      resolve(sheets);
    }).catch((err) => {
      if (err) reject(err);
    });
  });
}

module.exports = {
  getDataInSheet,
  getSheets,
};
