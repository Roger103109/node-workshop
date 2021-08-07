// 請問下列程式碼印出的順序為何？

function syncF() {
  console.log(1); //3,輸出1

  setTimeout(() => {
    console.log(2); //4.丟給webapis  //8.輸出2
  }, 0);
  console.log(3); //5.輸出3
}

console.log(4); //1.首先執行 輸出4
syncF(); //2.呼叫函式
console.log(5); //6.輸出 5
//7.event loop
