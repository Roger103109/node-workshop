async function asyncF() {
  console.log(1); //3,輸出1
  await new Promise((resolve, reject) => {
    //丟給?? 跳出函式
    setTimeout(() => {
      console.log(2); //5. 輸出2
      resolve();
    }, 0);
  });
  console.log(3); //6. 輸出3
}

console.log(4); //1.首先執行 輸出4
asyncF(); //2.呼叫函式
console.log(5); //4. 輸出5
