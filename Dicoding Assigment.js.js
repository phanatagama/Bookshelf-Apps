function scoreChecker(score) {
    let result;
  
    // TODO
   if (score >= 90) {
      result = 'Anda mendapatkan nilai A.';
   } else if((score >=80) && (score<=89)) {
      result = 'Anda mendapatkan nilai B.';
   } else if((score>=70) && (score<=79)) {
      result = 'Anda mendapatkan nilai C.';
   } else if((score>=60) && (score<=69)) {
      result = 'Anda mendapatkan nilai D.';
   }else{
      result = 'Anda mendapatkan nilai E.';
   }
  
  
    // Jangan hapus kode ini
    return result;
  }

const restaurant = {
    name: "Dcopzz",
    city: "Bwx",
    "favorite food":"nasi",
    "favorite drink": 'soda',
    isVegan: false
}
const {name} = restaurant;
const favoriteDrink = restaurant['favorite drink'];
console.log(name,favoriteDrink);

const evenNumber =[];
for (let i = 0 ; i < 100;i++){
    if (i%2==0) evenNumber.push(i)
}
console.log(evenNumber);

function minimal(a,b){
    if(a==b){
        return a;
    }else{
        return (a<b) ? a : b
    }
}
console.log(minimal(5,7));

function power(a,b){
    return Math.pow(a,b);
}
console.log(power(2,3));