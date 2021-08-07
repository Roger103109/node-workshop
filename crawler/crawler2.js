const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
new Promise((resolve, reject) => {
  fs.readFile("stock.txt", "utf8", (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
}).then((data) => {
  return axios
    .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: data.trim(),
      },
    })
    .then((response) => {
      console.log(response.data.title);
    });
});
