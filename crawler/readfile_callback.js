const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
fs.readFile("stock.txt", "utf8", (err, data) => {
  axios
    .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: data.trim(),
      },
    })
    .then((response) => {
      console.log(response);
    });
});
