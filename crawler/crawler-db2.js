const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
const { resolve } = require("path");
const { rejects } = require("assert");
require("dotenv").config();
//設定資料庫
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
//準備連線
connection.connect((err) => {
  if (err) {
    console.error("資料庫連不上");
  }
});  

到資料庫抓資料
let results =await new Promise((resolve,reject)=>{
  connection.query("SELECT * FROM stock WHERE stock_id= ?", 
  [stock],
  function ( error, results, fields){
    if(error){
      //失敗
      reject(error);
    }
    //成功
    resolve(results);
  }
  );
})



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
try{
  crawler();
}catch{
  connection.end();
}


// 不關閉連線，認為程式一直在執行



// function readStockPromise() {}
// function readStockPromise() {}
// function readStockPromise() {}
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
//     console.error(e);
//   } finally {
//     connection.end();
//   }
// }

// new Promise((resolve, reject) => {
//   connection.query(
//     " SELECT * FROM stock WHERE stock_id=?",
//     [stock],
//     function (error, results, fields) {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(results);
//       }
//       console.log("The solution is: ", results[0].solution);
//     }
//   );
// });
// console.log(results);

// if (results.length > 0) {
//   const crawler = await axios.get(
//     "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
//     {
//       params: {
//         response: "json",
//         date: moment().format("YYYYMMDD"),
//         stockNo: stock.trim(),
//       },
//     }
//   );
// }

// connection.query(
//   " SELECT * FROM stock WHERE stock_id=?",
//   [stock],
//   function (error, results, fields) {
//     if (error) throw error;
//     console.log("The solution is: ", results[0].solution);
//   }
// );

// crawler();
