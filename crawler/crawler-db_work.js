const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// 準備連線
connection.connect((err) => {
    if (err) {
        console.error("資料庫連不上");
    }
});

//到stock.txt讀stock
function readStock() {
    return new Promise((resolve, reject) => {
        fs.readFile("stock.txt", "utf8", (err, stock) => { 
            if (err) {
                reject(err);
            }
            else {
                resolve(stock.trim());
            }
        })
    });
}
//到證交所抓資料
function queryStock(getStockNo) {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
            response: "json",
            date: moment().format("YYYYMMDD"),
            stockNo: getStockNo,
        },
    })
}

//到資料庫抓stock_id
function querySqlStockNo(StockNo) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM stock WHERE stock_id = ?",
            [StockNo],
            function (error, results, fields) {
                if (error) {
                    // 錯誤處理
                    reject(error);
                }
                resolve(results);
            }
        );
    });
}

//把資料寫入資料庫
function insertSqlData(DataItem){
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
            [DataItem],
            function (error, results, fields) {
                if (error) {
                    // 錯誤處理
                    reject(error);
                }
                resolve(results);

            }
        );
    });

}

async function crawler() {
    try {
        //到stock.txt讀stock
        let getStockNo = await readStock(); 
        //到資料庫抓stock_id
        let dbResults = await querySqlStockNo(getStockNo); 

        if (dbResults.length === 0) {
            throw "此股票代碼不存在於資料庫";
        }
        else {
            console.info("資料庫有查到資料");
        }
        //到證交所抓資料
        let getData = await queryStock(getStockNo); 

        const twseData = getData.data;
        if (twseData.stat !== 'OK'){
            throw "證交所資料錯誤！"
        }
        else{
            let DataItem = twseData.data.map((item) => {
                item = item.map((val)=>{
                    //=== star 處理千位符 ===//
                    return val.replace(/,/g, "");
                    //=== end 處理千位符 ===//
                })
                // console.log("item",item); //for check

                //把日期->民國年 <<轉>> 西元年
                item[0] = parseInt(item[0].replace(/\//g, "")) + 19110000;
              
                item[7] = parseInt(item[7]);
                //把 stock_id 放進來資料裡的第一
                item.unshift(getStockNo);
                return item; //將處裡好的資料回傳
            })
            // console.log("DataItem",DataItem); //for check
            //  DataItem[
            //   '股碼',  '日期', '成交股數', '成交金額', '開盤價', '最高價', '最低價', '收盤價', '漲跌價差','成交筆數'
            // ]
            //把資料寫入資料庫
            let insertData = await insertSqlData(DataItem);
            console.log("insertData",insertData); 
        }
    }
    catch (err) {
        console.error(err);
    }
    finally {
        // 不關閉連線，認為程式一直在執行
        connection.end();
    }
}
crawler();