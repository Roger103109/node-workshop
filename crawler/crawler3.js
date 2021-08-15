const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

async function crawler() {
  try {
    const stock = await new Promise((resolve, reject) => {
      fs.readFile("stock.txt", "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    const crawler = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: "json",
          date: moment().format("YYYYMMDD"),
          stockNo: stock.trim(),
        },
      }
    );
    console.log(crawler.data.title);
  } catch (e) {
    console.log(e);
  }
}
crawler();
