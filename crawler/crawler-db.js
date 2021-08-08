const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();
// async function crawler() {
//   try {
//     const stock = await new Promise((resolve, reject) => {
//       fs.readFile("stock.txt", "utf8", (err, data) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(data);
//         }
//       });
//     });
//     const crawler = await axios.get(
//       "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
//       {
//         params: {
//           response: "json",
//           date: moment().format("YYYYMMDD"),
//           stockNo: stock.trim(),
//         },
//       }
//     );

//     console.log(crawler.data.title);
//   } catch (e) {
//     console.log(e);
//   }
// }
// crawler();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("資料庫連不上");
  }
});

// 不關閉連線，認為程式一直在執行
connection.end();
