console.log("test");

let totalresult=0;
function sum(n){
    for(i=0;i<=n;i++){
        totalresult=i+totalresult;
    }
    return totalresult;
};
console.log(sum(10));