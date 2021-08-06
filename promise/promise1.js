let doWork = function (job, timer, isOK) {
  // 解決 callback hell:
  // ==> 把 callback -> 改用 Promise
  // 物件： new Promise();
  // 建構式一定要傳入一個函式，而且這個函式本身會有兩個參數
  // resolve, reject
  return new Promise((resolve, reject) => {
    // 模擬一個非同步工作
    console.log(`${job} in promise`);
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        // 完成
        resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      } else {
        // 失敗
        reject(`失敗了 ${job}`);
      }
    }, timer);
  });
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
// 解決: 接續做的工作
// ---> 動作如果要接續著做，只能把下一個動作放在上一個動作的 callback
//   --> callback hell

let job1 = doWork("刷牙", 3000, false);
console.log(job1);
job1.then(
  function (resolve) {
    //成功
    console.log("第 1 個函式被呼叫了", resolve);
  },
  function (reject) {
    //失敗
    console.log("第 2 個函式被呼叫了", reject);
  }
);

let job2 = doWork("吃飯", 3000, true);
console.log(job2);
job2.then(
  function (resolve) {
    //成功
    console.log("第 1 個函式被呼叫了", resolve);
  },
  function (reject) {
    //失敗
    console.log("第 2 個函式被呼叫了", reject);
  }
);
