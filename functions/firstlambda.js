"use strict";
const fs = require("fs");
const Papa = require("papaparse");

module.exports.handler = async (event) => {
  const file = fs.createReadStream(`books-to-list-dev.csv`);
  const jsonData = await toJson(file);
  return jsonData;
};

const toJson = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete(results) {
        resolve({ data: results.data });
      },
      error(err) {
        reject(err);
      },
    });
  });
};
