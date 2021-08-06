let doWork = function (job, timer, isOK) {
  // 解決 callback hell:
  // ==> 把 callback -> 改用 Promise
  // 物件： new Promise();
  // 建構式一定要傳入一個函式，而且這個函式本身會有兩個參數
  // resolve, reject
  return new Promise((resolve, reject) => {
    // 模擬一個非同步工作
    // console.log(`${job} in promise`);
    let dt = new Date();
    console.log(`開始 ${job} at ${dt.toISOString()}`);
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        // 完成
        resolve(`完成 ${job} at ${dt.toISOString()}`);
      } else {
        // 失敗
        reject(`失敗了 ${job}`);
      }
    }, timer);
  });
};

// 刷牙 -> 吃早餐 -> 寫功課

// 解決: 接續做的工作
// ---> 動作如果要接續著做，只能把下一個動作放在上一個動作的 callback
//   --> callback hell

async function doWorks() {
  let job1 = await doWork("刷牙", 3000, true);
  console.log(job1);
  let job2 = await doWork("吃早餐", 3000, true);
  console.log(job2);
  let job3 = await doWork("寫功課", 3000, true);
  console.log(job3);
  let job4 = await doWork("看電視", 3000, true);
  console.log(job4);
  let job5 = await doWork("睡午覺", 3000, true);
  console.log(job5);
}
doWorks();
