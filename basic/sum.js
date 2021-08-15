console.log("test");

function sum(n) {
  let totalresult = 0;
  for (let i = 0; i <= n; i++) {
    totalresult = i + totalresult;
  }
  return totalresult;
}

// function sum(n) {
//   let totalresult = 0;
//   for (let i = 0; i <= n; i++) {
//     totalresult = i + totalresult;
//   }
//   return totalresult;
// }
console.log(sum(1));
console.log(sum(10));
